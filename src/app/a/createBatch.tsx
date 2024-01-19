"use client";

import { Combobox } from "@headlessui/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { MdOutlineAlternateEmail } from "react-icons/md";

const CreateBatch = () => {
  const router = useRouter();
  const [batchCreate, setBatchCreate] = useState(false);
  // const [selected, setSelected] = useState(domains[0]);
  const [query, setQuery] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [responseData, setResponseData] = useState<any>(null);
  const [formData, setFormData] = useState({
    quantity: 10,
    colorFill: "",
  });

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  async function handleSubmit(formData: FormData) {
    try {
      setLoading(true);
      setError(null);

      const rawFormData = {
        quantity: formData.get("quantity"),
        colorFill: formData.get("colorFill"),
      };
      const response = await fetch("/api/create-qr", {
        method: "POST",
        body: JSON.stringify(rawFormData),
      });

      if (response.status === 200) {
        console.log("Success:", await response);
        setBatchCreate(false);
        setResponseData(await response.json());
        // router.refresh();
      } else {
        const errorData = await response.json();
        setError(errorData.message);
      }
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="flex flex-wrap items-center justify-between md:flex-nowrap px-4 py-5 sm:px-6">
        <div>
          <h3 className="text-base font-semibold leading-6 text-gray-900">
            QR Code Batches
          </h3>
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
        <form action={handleSubmit} className="pb-2">
          <div className="mx-4 lg:mx-8 my-2 flex-wrap items-center justify-between md:flex">
            <div className="flex space-x-8 mt-2">
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
              <button
                type="button"
                className="text-sm font-semibold leading-6 text-gray-900"
                onClick={() => setBatchCreate(false)}
              >
                Cancel
              </button>
              <button
                type="submit"
                // disabled={loading}
                className="inline-flex justify-center rounded-md bg-sky-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
              >
                {loading ? "Creating..." : "Create"}
              </button>
            </div>
          </div>
        </form>
      )}
      {responseData && (
        <div className="mx-4 lg:mx-8 py-2 flex-wrap items-center justify-between md:flex">
          {responseData.slug}
          <br />
          {responseData.quantity}
          <br />
          {responseData.colorFill}
        </div>
      )}
    </>
  );
};

export default CreateBatch;
