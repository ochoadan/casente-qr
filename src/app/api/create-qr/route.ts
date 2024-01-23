import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
import prisma from "@/utils/prisma";
import { auth } from "auth";
import { nanoid } from "nanoid";
import { QRCodeCanvas, Options } from "@loskir/styled-qr-code-node";
import { createId } from "@paralleldrive/cuid2";
import archiver from "archiver";
import fs from "fs";

// Create an instance of the S3 client
const client = new S3Client({
  region: "us-east-2",
  credentials: {
    accessKeyId: "AKIA4MTWK5DZZOJRCK4C",
    secretAccessKey: "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",
  },
});

// Define the POST route handler
export const POST = auth(async (req) => {
  const { batchName, quantity, colorFill } = await req.json();
  const finalBatchName = batchName || "Untitled Batch";

  if (!req.auth) {
    return Response.json({ message: "Not authenticated" }, { status: 401 });
  }

  try {
    const files = [];
    const batchId = createId();
    // Create a new batch in the database
    await prisma.batches.create({
      data: {
        id: batchId,
        name: finalBatchName,
        quantity: Number(quantity),
        batchZipUrl: `https://casente.s3.us-east-2.amazonaws.com/${batchId}.zip`,
        csvUrl: `https://casente.s3.us-east-2.amazonaws.com/${batchId}.csv`,
      },
    });

    // Create the QR codes
    for (let i = 0; i < quantity; i++) {
      // Create a unique slug for the QR code
      let slug: string;
      let existingQRCode: any;

      do {
        slug = nanoid(8);
        existingQRCode = await prisma.qRCodes.findUnique({ where: { id: slug }, });
      } while (existingQRCode);

      const qrUrl = `https://0pc.cc/c/${slug}`;

      // Define the options for the QR code generation
      const options: Partial<Options> = {
        data: qrUrl,
        margin: 0,
        qrOptions: { typeNumber: 0, mode: "Byte", errorCorrectionLevel: "M", },
        imageOptions: { hideBackgroundDots: false, imageSize: 0, margin: 0 },
        dotsOptions: { type: "rounded", color: colorFill || "#000000", gradient: undefined, },
        backgroundOptions: { color: "#0000" },
        image: undefined,
        cornersSquareOptions: { type: "extra-rounded", color: colorFill || "#000000", },
        cornersDotOptions: { type: undefined, color: colorFill || "#000000" },
      };

      // Generate the QR code images
      const [fileDataUrl, smallFileDataUrl] = await Promise.all([
        new QRCodeCanvas({ ...options, width: 3000, height: 3000 }).toDataUrl("png"),
        new QRCodeCanvas({ ...options, width: 200, height: 200 }).toDataUrl("png"),
      ]);

      // Upload the QR code image to the S3 bucket
      const putCommands = [
        { Bucket: "casente-public", Key: `qr-${slug}.png`, Body: Buffer.from(fileDataUrl.replace("data:image/png;base64,", ""), "base64"), ContentType: "image/png", },
        { Bucket: "casente", Key: `qr-small-${slug}.png`, Body: Buffer.from(smallFileDataUrl.replace("data:image/png;base64,", ""), "base64"), ContentType: "image/png", },
      ];
      await Promise.all(putCommands.map((params) => client.send(new PutObjectCommand(params))));

      // Create a file object with the necessary details
      const file = {
        id: slug,
        name: `${slug}.png`,
        url: `https://casente-public.s3.us-east-2.amazonaws.com/qr-${slug}.png`,
        urlSmall: `https://casente.s3.us-east-2.amazonaws.com/qr-small-${slug}.png`,
        qrCodeDataUrl: fileDataUrl,
        smallQrCodeDataUrl: smallFileDataUrl,
        unlockCode: Math.floor(10000000 + Math.random() * 90000000),
      };
      files.push(file);
    }
    // End of the QR code generation


    // Create a zip file and upload it to the S3 bucket
    const zip = archiver("zip", { zlib: { level: 9 } });
    zip.on("error", (err) => {
      throw err;
    });
    for (const file of files) {
      const fileBuffer = Buffer.from(file.qrCodeDataUrl.replace("data:image/png;base64,", ""), "base64");
      const unlockCodeText = String(file.unlockCode); // Convert unlock code to string
      const textFileBuffer = Buffer.from(unlockCodeText, "utf-8"); // Encode unlock code as a string
      zip.append(textFileBuffer, { name: `${file.id}.txt` });
      zip.append(fileBuffer, { name: `${file.id}.png` });
    }
    zip.finalize();

    const zipBuffer = await new Promise<Buffer>((resolve, reject) => {
      const chunks: Buffer[] = [];
      zip.on("data", (chunk) => chunks.push(chunk));
      zip.on("end", () => resolve(Buffer.concat(chunks)));
      zip.on("error", (err) => reject(err));
    });
    const upload = new Upload({ client, params: { Bucket: "casente", Key: `${batchId}.zip`, Body: zipBuffer, ContentType: "application/zip", }, });
    await upload.done();


    // Create a CSV file and upload it to the S3 bucket
    const { stringify } = require('csv-stringify');
    const csvRecords = files.map((file) => ({ id: file.id, url: file.url, unlockCode: file.unlockCode }));
    let csvString = '';
    stringify(csvRecords, { header: ['ID', 'URL', 'Unlock Code'] })
      .on('readable', function (this: any) {
        let row;
        while ((row = this.read())) {
          csvString += row;
        }
      })
      .on('error', function (err: any) {
        throw err;
      })
      .on('end', async function () {
        const csvBuffer = Buffer.from(csvString, 'utf-8');
        const putParams = { Bucket: 'casente', Key: `${batchId}.csv`, Body: csvBuffer, ContentType: 'text/csv' };
        const putCommand = new PutObjectCommand(putParams);
        await client.send(putCommand);
      });


    await prisma.batches.update({
      where: { id: batchId, },
      data: {
        qrcodes: {
          create: files.map((file) => ({
            id: file.id,
            unlockCode: file.unlockCode.toString(),
            fullImageUrl: file.url,
            smallImageUrl: file.urlSmall,
          })),
        },
      },
    });
    // const successResponseData = {
    //   message: "Codes created successfully",
    //   batchId,
    //   // files: files.map((file) => ({
    //   //   id: file.id,
    //   //   name: file.name,
    //   //   url: file.url,
    //   // })),
    // };

    // Return the response with the created files
    return Response.json({ message: "Codes created successfully", batchId: batchId, }, { status: 200 });
  } catch (error) {
    console.log("Error:", error);
    return Response.json({ message: "Internal server error" }, { status: 500 });
  }
}) as any;
