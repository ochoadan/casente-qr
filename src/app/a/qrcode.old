"use client";

import { useState } from "react";
import Image from "next/image";
import QRCodeStyling from "qr-code-styling";
import { nanoid } from "nanoid";

const Qrcode = () => {
  const [inputValue, setInputValue] = useState("");
  const [qrCodeData, setQrCodeData] = useState<string>();

  const slug = nanoid(8);

  const generateQRCode = async () => {
    const qrCode = new QRCodeStyling({
      width: 2000,
      height: 2000,
      margin: 0,
      qrOptions: {
        typeNumber: 0,
        mode: "Byte",
        errorCorrectionLevel: "M",
      },
      imageOptions: { hideBackgroundDots: false, imageSize: 0, margin: 0 },
      dotsOptions: {
        type: "rounded",
        color: "#000000",
        gradient: undefined,
      },
      backgroundOptions: { color: "#0000" },
      image: undefined,
      cornersSquareOptions: { type: "extra-rounded", color: "#000000" },
      cornersDotOptions: { type: undefined, color: "#000000" },
    });
    qrCode.update({
      data: inputValue,
    });
    const rawData = await qrCode.getRawData("png");
    setQrCodeData(URL.createObjectURL(rawData as Blob));
  };

  return (
    <>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button onClick={generateQRCode}>Generate QR Code</button>

      {qrCodeData && (
        <div className="max-w-sm mx-auto m-12">
          <Image
            src={qrCodeData}
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
