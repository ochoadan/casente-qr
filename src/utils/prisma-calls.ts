import prisma from "./prisma";

// export async function getDomainData() {
//   const response = await prisma.domains.findMany();

//   const domainsData = response.map((item: any) => ({
//     id: item.id,
//     name: item.domain,
//   }));

//   return domainsData;
// }

// export async function getUsersRoutes({ session }: any) {
//   const response = await prisma.emailRoutes.findMany({
//     where: {
//       createdById: session.user.id,
//     },
//   });

//   const routesData = response.map((item: any) => ({
//     id: item.id,
//     name: item.domain,
//     toEmail: item.toEmail,
//     fromEmail: item.fromEmail,
//     // priority: item.priority,
//     // description: item.description,
//     // expression: item.expression,
//   }));

//   return routesData;
// }

export async function getBatches() {
  const response = await prisma.batches.findMany();

  const batchesData = response.map((item: any) => ({
    id: item.id,
    name: item.name,
  }));

  return batchesData;
}

export async function getBatchesData(requestBatchId: string) {
  const response = await prisma.qRCodes.findMany({
    where: {
      batchId: requestBatchId,
    },
  });
  const batchData = response.map((item: any) => ({
    id: item.id,
    url: item.url,
  }));
  return batchData;
}
