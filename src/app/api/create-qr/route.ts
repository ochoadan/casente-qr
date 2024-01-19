import { S3Client, ListBucketsCommand } from "@aws-sdk/client-s3";
import prisma from "@/utils/prisma";
import { auth } from "auth";
import { nanoid } from "nanoid";
import { QRCodeCanvas, Options } from "@loskir/styled-qr-code-node";

const options: Partial<Options> = {
  width: 400,
  height: 400,
  data: "https://www.facebook.com/",
  image:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/1200px-Facebook_Logo_%282019%29.png",
  dotsOptions: {
    color: "#4267b2",
    type: "rounded",
  },
  backgroundOptions: {
    color: "#e9ebee",
  },
  imageOptions: {
    crossOrigin: "anonymous",
    margin: 20,
  },
};

// const client = new S3Client({ region: "us-east-2" });
// const params = {
//   Bucket: "casente",
// };
// const command = new ListBucketsCommand(params);

export const POST = auth(async (req) => {
  const { quantity, colorFill } = await req.json();

  if (!req.auth) {
    return Response.json({ message: "Not authenticated" }, { status: 401 });
  }

  try {
    const slug = nanoid(8);
    const qrCode = new QRCodeCanvas(options);

    const file = await qrCode.toDataUrl("png");
    // const generateQRCode = async () => {
    // const qrCode = new QRCodeStyling({
    // });
    //   // qrCode.update({
    //   //   data: inputValue,
    //   // });
    //   const rawData = await qrCode.getRawData("png");
    //   const qrimg = URL.createObjectURL(rawData as Blob);
    // };
    return Response.json(
      {
        message: "Email sent",
        slug: slug,
        quantity: quantity,
        colorFill: colorFill,
        pnfFile: file,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error:", error);
    return Response.json({ message: "Internal server error" }, { status: 500 });
  }
}) as any;
