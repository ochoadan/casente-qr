import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import prisma from "@/utils/prisma";
import { auth } from "auth";
import { nanoid } from "nanoid";
import { QRCodeCanvas, Options } from "@loskir/styled-qr-code-node";
import { createId } from "@paralleldrive/cuid2";

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
  const { quantity, colorFill } = await req.json();

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
        name: `Batch ${batchId}`,
        quantity: Number(quantity),
      },
    });

    // Create the QR codes
    for (let i = 0; i < quantity; i++) {
      // Create a unique slug for the QR code
      let slug: string;
      let existingQRCode: any;

      do {
        slug = nanoid(8);
        existingQRCode = await prisma.qRCodes.findUnique({
          where: { id: slug },
        });
      } while (existingQRCode);

      const qrUrl = `HTTPS://0PC.CC/C/${slug}`;
      // Define the options for the QR code generation
      const options: Partial<Options> = {
        data: qrUrl,
        margin: 0,
        qrOptions: {
          typeNumber: 0,
          mode: "Byte",
          errorCorrectionLevel: "M",
        },
        imageOptions: { hideBackgroundDots: false, imageSize: 0, margin: 0 },
        dotsOptions: {
          type: "rounded",
          color: colorFill || "#000000",
          gradient: undefined,
        },
        backgroundOptions: { color: "#0000" },
        image: undefined,
        cornersSquareOptions: {
          type: "extra-rounded",
          color: colorFill || "#000000",
        },
        cornersDotOptions: { type: undefined, color: colorFill || "#000000" },
      };

      // Generate the QR code images
      const [fileDataUrl, smallFileDataUrl] = await Promise.all([
        new QRCodeCanvas({ ...options, width: 3000, height: 3000 }).toDataUrl(
          "png"
        ),
        new QRCodeCanvas({ ...options, width: 200, height: 200 }).toDataUrl(
          "png"
        ),
      ]);

      // Upload the QR code image to the S3 bucket
      // const putParams = {
      //   Bucket: "casente",
      //   Key: `${slug}.png`,
      //   Body: Buffer.from(
      //     fileDataUrl.replace("data:image/png;base64,", ""),
      //     "base64"
      //   ),
      //   ContentType: "image/png",
      // };
      // const putCommand = new PutObjectCommand(putParams);
      // await client.send(putCommand);

      // Create a file object with the necessary details
      const file = {
        id: slug,
        name: `${slug}.png`,
        url: `https://s3.us-east-2.amazonaws.com/casente/${slug}.png`,
        qrCodeDataUrl: fileDataUrl,
        smallQrCodeDataUrl: smallFileDataUrl,
        unlockCode: Math.floor(10000000 + Math.random() * 90000000),
      };
      files.push(file);
    }
    // End of the QR code generation

    await prisma.batches.update({
      where: { id: batchId },
      data: {
        qrcodes: {
          create: files.map((file) => ({
            id: file.id,
            unlockCode: file.unlockCode.toString(),
            fullImageUrl: file.url,
          })),
        },
      },
    });

    // Return the response with the created files
    return Response.json(
      {
        message: "Codes created successfully",
        files: files,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error:", error);
    return Response.json({ message: "Internal server error" }, { status: 500 });
  }
}) as any;
