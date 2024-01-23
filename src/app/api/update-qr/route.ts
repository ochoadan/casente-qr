import prisma from "@/utils/prisma";

export async function POST(request: Request) {
    const { unlockCode, slug, redirectUrl } = await request.json();

    // Check if redirectUrl is valid
    const validRedirectUrl = redirectUrl.startsWith("http://") || redirectUrl.startsWith("https://") ? redirectUrl : `http://${redirectUrl}`;

    try {
        await prisma.qRCodes.update({
            where: {
                id: slug,
                unlockCode: unlockCode,
            },
            data: {
                isUnlocked: true,
                pointsToUrl: validRedirectUrl,
            },
        });

        return Response.json({ message: "Code is valid", redirectUrl: validRedirectUrl }, { status: 200 });
    } catch (error) {
        console.log("Error:", error);
        return Response.json({ message: "Internal server error" }, { status: 500 });
    }
};