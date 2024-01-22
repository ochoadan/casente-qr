import prisma from "@/utils/prisma";

export async function POST(request: Request) {
    const { unlockCode, slug, redirectUrl } = await request.json();

    try {
        const code = await prisma.qRCodes.update({
            where: {
                id: slug,
                unlockCode: unlockCode,
            },
            data: {
                isUnlocked: true,
                pointsToUrl: redirectUrl,
            },
        });


        return Response.json({ message: "Code is valid", redirectUrl: redirectUrl }, { status: 200 });
    } catch (error) {
        console.log("Error:", error);
        return Response.json({ message: "Internal server error" }, { status: 500 });
    }
};