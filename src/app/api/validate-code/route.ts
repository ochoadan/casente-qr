import prisma from "@/utils/prisma";

export async function POST(request: Request) {
  const { unlockCode, slug } = await request.json();

  try {
    const code = await prisma.qRCodes.findUnique({
      where: {
        id: slug,
        unlockCode: unlockCode,
      },
    });

    if (!code) {
      return Response.json({ message: "Invalid code" }, { status: 400 });
    }

    return Response.json({ message: "Code is valid" }, { status: 200 });
  } catch (error) {
    console.log("Error:", error);
    return Response.json({ message: "Internal server error" }, { status: 500 });
  }
};