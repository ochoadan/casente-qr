import Navbar from "@/components/admin/navbar";
import Container from "@/components/container";
import { getBatchesData, verifyBatchExistence } from "@/utils/prisma-calls";
import { redirect } from "next/navigation";
import BatchesTable from "./table";

const Page = async ({ params }: { params: { slugId: string } }) => {

    const batchIsTrue = await verifyBatchExistence(params.slugId);
    if (!batchIsTrue) {
        redirect("/")
    }

    const batchData = await getBatchesData(params.slugId);

    return (
        <>
            <Navbar />
            <Container className="my-8">
                <BatchesTable data={batchData} />
            </Container>
        </>
    );

}

export default Page;