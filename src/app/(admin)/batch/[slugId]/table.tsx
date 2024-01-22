
import clsx from "clsx"
import Image from "next/image";
import Link from "next/link";
// import { useEffect, useState } from "react";
import { FaFileCsv, FaRegFileZipper } from "react-icons/fa6";

export default async function BatchesTable({ data }: any) {
  // const [visibleQrCodes, setVisibleQrCodes] = useState(10);
  // const handleScroll = () => {
  //   const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
  //   if (scrollTop + clientHeight >= scrollHeight) {
  //     setVisibleQrCodes(prevVisibleQrCodes => prevVisibleQrCodes + 10);
  //   }
  // };
  // useEffect(() => {
  //   window.addEventListener('scroll', handleScroll);
  //   return () => {
  //     window.removeEventListener('scroll', handleScroll);
  //   };
  // }, []);


  return (
    <>
      {/* <pre className="text-xs">{JSON.stringify(data, null, 2)}</pre> */}

      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">{data.name}</h1>
          <p className="mt-2 text-sm text-gray-700">
            This Batch was Created on {new Date(data.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", hour: "numeric", minute: "numeric", second: "numeric", })}
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none space-x-4">
          <Link
            target="_blank"
            href={data.csvUrl}
            className="inline-flex items-center gap-x-1.5 rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
          >
            <FaFileCsv className="-ml-0.5 h-5 w-5" aria-hidden="true" />
            Download CSV
          </Link>
          <Link
            target="_blank"
            href={data.batchZipUrl}
            className="inline-flex items-center gap-x-1.5 rounded-md bg-amber-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-amber-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
          >
            <FaRegFileZipper className="-ml-0.5 h-5 w-5" aria-hidden="true" />
            Download ZIP
          </Link>
        </div>
      </div>
      <div className="-mx-4 mt-10 ring-1 ring-gray-300 sm:mx-0 sm:rounded-lg bg-white">
        <table className="min-w-full divide-y divide-gray-300">
          <thead>
            <tr>
              <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                Qr Code
              </th>
              <th
                scope="col"
                className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
              >
                Id
              </th>
              <th
                scope="col"
                className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
              >
                Lock Status
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
              >
                Unlock Code
              </th>
              {/* <th
                scope="col"
                className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
              >
                Storage
              </th>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                Price
              </th>
              <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                <span className="sr-only">Select</span>
              </th> */}
              <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                <span className="sr-only">Select</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {data.qrcodes.map((qrCode: any, qrCodeIdx: number) => (
            // {/* {data.qrcodes.slice(0, visibleQrCodes).map((qrCode: any, qrCodeIdx: number) => ( */}
              <tr key={qrCodeIdx}>
                <td className='whitespace-nowrap relative py-4 pl-4 pr-3 text-sm sm:pl-6'>
                  {/* <Link href={qrCode.fullImageUrl} target="_blank"> */}
                  <Image width={50} height={50} src={qrCode.smallImageUrl} alt="Qr Code" />
                  {/* </Link> */}
                </td>
                <td
                  className={'hidden px-3 py-3.5 text-sm text-gray-500 lg:table-cell'}
                >
                  {qrCode.id}
                </td>
                <td
                  className="hidden whitespace-nowrap px-3 py-5 text-sm text-gray-500 lg:table-cell"
                >
                  <span className={clsx('inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset',
                    qrCode.isUnlocked ? 'bg-green-50 text-green-700 ring-green-600/20' : 'bg-red-50 text-red-700 ring-red-600/20'

                  )}>
                    {qrCode.isUnlocked ? 'Unlocked' : 'Locked'}
                  </span>
                </td>
                <td className='px-3 py-3.5 text-sm text-gray-500 lg:table-cell'>
                  {qrCode.unlockCode}
                </td>
                <td
                  className={clsx(
                    'relative py-3.5 pl-3 pr-4 text-right text-sm font-medium sm:pr-6'
                  )}
                >
                  <Link
                    href={qrCode.fullImageUrl}
                    target="_blank"
                    className="inline-flex items-center rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-white"
                  >
                    Download
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
      </div>
    </>
  )
}

// <tr key={plan.id}>
//   <td
//     className={clsx(
//       planIdx === 0 ? '' : 'border-t border-transparent',
//       'relative py-4 pl-4 pr-3 text-sm sm:pl-6'
//     )}
//   >
//     <div className="font-medium text-gray-900">
//       {plan.name}
//       {plan.isCurrent ? <span className="ml-1 text-indigo-600">(Current Plan)</span> : null}
//     </div>
//     <div className="mt-1 flex flex-col text-gray-500 sm:block lg:hidden">
//       <span>
//         {plan.memory} / {plan.cpu}
//       </span>
//       <span className="hidden sm:inline">·</span>
//       <span>{plan.storage}</span>
//     </div>
//     {planIdx !== 0 ? <div className="absolute -top-px left-6 right-0 h-px bg-gray-200" /> : null}
//   </td>
//   <td
//     className={clsx(
//       planIdx === 0 ? '' : 'border-t border-gray-200',
//       'hidden px-3 py-3.5 text-sm text-gray-500 lg:table-cell'
//     )}
//   >
//     {plan.memory}
//   </td>
//   <td
//     className={clsx(
//       planIdx === 0 ? '' : 'border-t border-gray-200',
//       'hidden px-3 py-3.5 text-sm text-gray-500 lg:table-cell'
//     )}
//   >
//     {plan.cpu}
//   </td>
//   <td
//     className={clsx(
//       planIdx === 0 ? '' : 'border-t border-gray-200',
//       'hidden px-3 py-3.5 text-sm text-gray-500 lg:table-cell'
//     )}
//   >
//     {plan.storage}
//   </td>
// {/* <td
//   className={clsx(
//     planIdx === 0 ? '' : 'border-t border-gray-200',
//     'px-3 py-3.5 text-sm text-gray-500'
//   )}
// >
//   <div className="sm:hidden">{plan.price}/mo</div>
//   <div className="hidden sm:block">{plan.price}/month</div>
// </td> */}
// {/* <td
//   className={clsx(
//     planIdx === 0 ? '' : 'border-t border-transparent',
//     'relative py-3.5 pl-3 pr-4 text-right text-sm font-medium sm:pr-6'
//   )}
// >
//   <button
//     type="button"
//     className="inline-flex items-center rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-white"
//     disabled={plan.isCurrent}
//   >
//     Download<span className="sr-only">, {plan.name}</span>
//   </button> */}
// {/* {planIdx !== 0 ? <div className="absolute -top-px left-0 right-6 h-px bg-gray-200" /> : null} */ }
// {/* </td> */ }
// </tr>