"use client";

import { Combobox } from "@headlessui/react";
import Image from "next/image";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { MdOutlineAlternateEmail } from "react-icons/md";

const CreateBatch = () => {
  const router = useRouter();
  const [batchCreate, setBatchCreate] = useState(false);
  // const [selected, setSelected] = useState(domains[0]);
  const [error, setError] = useState<string | null>(null);
  const [isAwaitingResponse, setAwaitingResponse] = useState(false);
  const [responseData, setResponseData] = useState<any>(null);
  const [formData, setFormData] = useState({
    quantity: 1,
    colorFill: "",
    batchName: "",
  });

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setAwaitingResponse(true);
    setError(null);
    try {
      const rawFormData = {
        ...formData,
      };
      const response = await fetch("/api/create-qr", {
        method: "POST",
        body: JSON.stringify(rawFormData),
      });

      if (response.status === 200) {
        console.log("Success:", await response);
        setBatchCreate(false);
        const routerResponseData = await response.json();
        setResponseData(routerResponseData)
        router.push(`/batch/${routerResponseData.batchId}`);
      } else {
        const errorData = await response.json();
        setError(errorData.message);
      }
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred. Please try again.");
    } finally {
      setAwaitingResponse(false);
    }
  };

  return (
    <>
      <div className="flex flex-wrap items-center justify-between md:flex-nowrap px-4 sm:px-6 h-20">
        <div>
          <h3 className="text-base font-semibold leading-6 text-gray-900">
            QR Code Batches
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Each code takes about second to be created.
          </p>
        </div>

        <div className="flex-shrink-0">
          {!batchCreate && (
            <div className="mt-3 sm:ml-4 sm:mt-0">
              <button
                onClick={() => setBatchCreate(true)}
                type="button"
                className="inline-flex items-center rounded-md bg-sky-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
              >
                Create new
              </button>
            </div>
          )}
        </div>
      </div>

      {batchCreate && (
        // <form action={handleSubmit} className="pb-2">
        <form onSubmit={handleSubmit} className="pb-2">
          <div className="mx-4 lg:mx-8 my-2 flex-wrap items-center justify-between md:flex">
            <div className="flex space-x-8 mt-2">
              <div className="w-1/2 min-w-0 flex-1 relative">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Batch Label
                </label>
                <input
                  type="text"
                  name="batchName"
                  id="batchName"
                  value={formData.batchName}
                  onChange={handleInputChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                  placeholder="Untitled Batch"
                />
              </div>
              <div className="w-1/2 min-w-0 flex-1 relative">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Number of Codes
                </label>
                <input
                  type="number"
                  name="quantity"
                  id="quantity"
                  required
                  value={formData.quantity}
                  onChange={handleInputChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                  placeholder="10"
                />
              </div>

              <div className="w-1/2 min-w-0 flex-1 relative">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Color Fill
                </label>

                <select
                  id="colorFill"
                  name="colorFill"
                  className="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-sky-600 sm:text-sm sm:leading-6"
                  defaultValue="Canada"
                >
                  <option value={"#000"}>Black</option>
                  <option value={"#fff"}>White</option>
                </select>
              </div>
            </div>
            <div className="flex mt-3 items-center justify-end gap-x-6">
              {!isAwaitingResponse && (
                <button
                  type="button"
                  className="text-sm font-semibold leading-6 text-gray-900"
                  onClick={() => setBatchCreate(false)}
                >
                  Cancel
                </button>
              )}
              <button
                type="submit"
                disabled={isAwaitingResponse}
                className="inline-flex justify-center rounded-md bg-sky-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
              >
                {isAwaitingResponse && (
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    className="mr-2"
                  >
                    <path
                      fill="#FFFFFF"
                      d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z"
                      opacity=".25"
                    />
                    <path
                      fill="#FFFFFF"
                      d="M10.14,1.16a11,11,0,0,0-9,8.92A1.59,1.59,0,0,0,2.46,12,1.52,1.52,0,0,0,4.11,10.7a8,8,0,0,1,6.66-6.61A1.42,1.42,0,0,0,12,2.69h0A1.57,1.57,0,0,0,10.14,1.16Z"
                    >
                      <animateTransform
                        attributeName="transform"
                        type="rotate"
                        dur="0.75s"
                        values="0 12 12;360 12 12"
                        repeatCount="indefinite"
                      />
                    </path>
                  </svg>
                )}

                {isAwaitingResponse ? "Loading..." : "Create"}
              </button>
            </div>
          </div>
        </form>
      )}
      {/* {responseData && (
        <div className="mx-4 lg:mx-8 py-2 flex-wrap items-center justify-between md:flex">
          {responseData.files.map((item: any) => (
            <div className="max-w-sm mx-auto m-12">
              <Image
                src={item.smallQrCodeDataUrl}
                alt="QR Code"
                width={200}
                height={200}
                quality={100}
              />
            </div>
          ))}

          <pre>{JSON.stringify(responseData, null, 2)}</pre>
          {responseData.batchId}
        </div>
      )} */}
      {error && (
        <div className="mx-4 lg:mx-8 py-2 flex-wrap items-center justify-between md:flex">
          <div className="max-w-sm mx-auto m-12">
            <p className="text-red-500">{error}</p>
            <pre>{JSON.stringify(error, null, 2)}</pre>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateBatch;
