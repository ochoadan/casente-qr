import { auth } from "auth";

import Navbar from "@/components/admin/navbar";
import Container from "@/components/container";
import { redirect } from "next/navigation";
import Qrcode from "./qrcode";
import CreateBatch from "./createBatch";

const Page = async () => {
  const session = await auth();
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
        </div>
      </Container>
    </>
  );
};

export default Page;
