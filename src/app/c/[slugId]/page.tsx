import Container from "@/components/container";
import Navbar from "@/components/qr/navbar";
import UpdateQr from "./UpdateQr";
import { RedirectType, permanentRedirect, redirect } from "next/navigation";
import { verifyCodeDirection } from "@/utils/prisma-calls";

const Page = async ({ params }: { params: { slugId: string } }) => {
  const codeResponse = await verifyCodeDirection(params.slugId);
  if (!codeResponse) {
    redirect("/404");
  } else if (codeResponse.redirectUrl) {
    permanentRedirect(codeResponse.redirectUrl, RedirectType.replace);
  }

  return (
    <>
      <Navbar />
      <Container>
        <UpdateQr slugId={params.slugId} />
      </Container>
    </>
  );
};

export default Page;
