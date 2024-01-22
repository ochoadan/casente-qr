import { auth } from "auth";

import Navbar from "@/components/admin/navbar";
import Container from "@/components/container";
import { redirect } from "next/navigation";
// import Qrcode from "./qrcode";
import CreateBatch from "./createBatch";
import BatchesMap from "./batchesMap";
import { getBatches } from "@/utils/prisma-calls";

const Page = async () => {
  const session = await auth();
  const domainsData = await getBatches();

  if (!session) {
    redirect("/signin");
  }

  return (
    <>
      <Navbar />
      <Container>
        {/* <Qrcode /> */}
        <div className="divide-y divide-gray-200 bg-white shadow sm:rounded-xl my-4">
          <CreateBatch />
          <BatchesMap data={domainsData} />
        </div>
      </Container>
    </>
  );
};

export default Page;
