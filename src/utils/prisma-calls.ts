import prisma from "./prisma";


export async function verifyCodeDirection(batchId: string) {
  const response = await prisma.qRCodes.findFirst({
    where: {
      id: batchId,
    },
  });

  if (response && response.isUnlocked) {
    return { success: true, redirectUrl: response.pointsToUrl };
  } else if (response && !response.isUnlocked) {
    return { success: true };
  } else {
    return false;
  }
}
export async function verifyBatchExistence(batchId: string) {
  const response = await prisma.batches.findFirst({
    where: {
      id: batchId,
    },
  });

  if (response) {
    return true;
  } else {
    return false;
  }
}

export async function getBatches() {
  const response = await prisma.batches.findMany();

  const batchesData = response.map((item: any) => ({
    id: item.id,
    createdAt: item.createdAt,
    name: item.name,
    quantity: item.quantity,
  }));

  // Sort the batchesData array by createdAt in descending order
  batchesData.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

  return batchesData;
}

export async function getBatchesData(requestBatchId: string) {
  const response = await prisma.batches.findUnique({
    where: {
      id: requestBatchId,
    },
    include: {
      qrcodes: true,
    },
  });
  return response;
}
