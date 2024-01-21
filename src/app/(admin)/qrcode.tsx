"use client";

import { useState } from "react";
import Image from "next/image";
import QRCodeStyling from "qr-code-styling";
import { nanoid } from "nanoid";

const Qrcode = () => {
  const [inputValue, setInputValue] = useState("");
  const [qrCodeData, setQrCodeData] = useState<string>();
  const [batchCreate, setBatchCreate] = useState(false);
  // const [selected, setSelected] = useState(domains[0]);
  const [query, setQuery] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [responseData, setResponseData] = useState<any>(null);

  const slug = nanoid(8);

  async function handleSubmit(formData: FormData) {
    try {
      const response = await fetch("/api/dev", {
        method: "POST",
      });

      if (response.status === 200) {
        console.log("Success:", await response);
        setResponseData(await response.json());
      } else {
        const errorData = await response.json();
        setError(errorData.message);
      }
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred. Please try again.");
    }
  }

  return (
    <>
      <form action={handleSubmit} className="text-center mt-8">
        <button
          type="submit"
          className="inline-flex items-center gap-x-2 rounded-md bg-sky-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
        >
          Generate QR Code
        </button>
      </form>

      {responseData && (
        <div className="max-w-sm mx-auto m-12">
          <Image
            src={responseData.pnfFile}
            alt="QR Code"
            width={2000}
            height={2000}
            quality={100}
          />
        </div>
      )}
      <div className="text-[#0000]"></div>
    </>
  );
};

export default Qrcode;
