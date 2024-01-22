import Link from "next/link";

const batchesMap = ({ data }: any) => {
    return (
        <>
            {data.length === 0 ? (
                <div className="px-4 py-5 sm:p-6">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">No batches created yet.</h3>
                    <div className="mt-2 max-w-xl text-sm text-gray-500">
                        <p>You can create a batch by clicking the button above.</p>
                    </div>
                </div>
            ) : (
            <div>
                <dl className="m-5 pb-5 grid grid-cols-1 gap-5 sm:grid-cols-3 ">
                    {data.map((batch: any) => (
                        <Link href={`/batch/${batch.id}`} key={batch.id} className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow ring-1 ring-gray-200 sm:p-6">
                            <dt className="text-base font-medium text-gray-800 truncate">{batch.name}</dt>
                            <div className="mt-2 text-sm">Id: {batch.id}</div>
                            <dt className="text-sm mt-1">Created: {new Date(batch.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", hour: "numeric", minute: "numeric", second: "numeric", })}</dt>
                            <dd className="mt-1 text-sm tracking-tight text-gray-900">Contains: {batch.quantity} </dd>
                        </Link>
                    ))}
                </dl>
                {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
            </div>
            )}
        </>
    )
}

export default batchesMap;