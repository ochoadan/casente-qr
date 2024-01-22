"use client"

import { useState } from "react";
import Link from "next/link";
import { FaLinkedin, FaXTwitter } from "react-icons/fa6";
import { useRouter } from "next/navigation";

const UpdateQr = ({ slugId }: any) => {
    const router = useRouter();
    const [awaitingResponse, setAwaitingResponse] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [validCode, setValidCode] = useState(false);
    const [formData, setFormData] = useState({
        unlockCode: "",
        redirectUrl: "",
    });

    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const validateCode = async (e: any) => {
        e.preventDefault();
        setAwaitingResponse(true);
        setError(null);
        try {
            const rawFormData = { unlockCode: formData.unlockCode, slug: slugId };
            const response = await fetch("/api/validate-code", {
                method: "POST",
                body: JSON.stringify(rawFormData),
            });

            if (response.status === 200) {
                setValidCode(true);
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

    const submitUrlChange = async (e: any) => {
        e.preventDefault();
        setAwaitingResponse(true);
        setError(null);
        try {
            const rawFormData = { unlockCode: formData.unlockCode, slug: slugId, redirectUrl: formData.redirectUrl };
            const response = await fetch("/api/update-qr", {
                method: "POST",
                body: JSON.stringify(rawFormData),
            });

            if (response.status === 200) {
                const routerResponseData = await response.json();
                router.replace(routerResponseData.redirectUrl)
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
    }

    return (
        <div className="grid min-h-full place-items-center py-24 sm:py-32">
            <div className="text-center">
                <p className="text-base font-semibold text-sky-600">Casente</p>
                <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                    {validCode ? "Update with a new link" : "Unlock your QR Code"}
                </h1>
                <p className="mt-6 text-base leading-7 text-gray-600">
                    {validCode
                        ? "Enter the address you would like to redirect your QR code to:"
                        : "Enter the code you received with your purchase to update your QR code:"
                    }
                </p>
                {validCode ? (
                    <form onSubmit={submitUrlChange}>
                        <div className="relative mt-4 rounded-md shadow-sm max-w-xs mx-auto">
                            <input
                                required
                                type="text"
                                name="redirectUrl"
                                id="redirectUrl"
                                value={formData.redirectUrl}
                                onChange={handleInputChange}
                                className="block w-full rounded-md border-0 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6 mx-auto text-center"
                                placeholder="https://www.example.com"
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={awaitingResponse}
                            className="mt-3 inline-flex justify-center rounded-md bg-sky-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
                        >
                            {awaitingResponse && (
                                <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="mr-2">
                                    <path fill="#FFFFFF" d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z" opacity=".25" />
                                    <path fill="#FFFFFF" d="M10.14,1.16a11,11,0,0,0-9,8.92A1.59,1.59,0,0,0,2.46,12,1.52,1.52,0,0,0,4.11,10.7a8,8,0,0,1,6.66-6.61A1.42,1.42,0,0,0,12,2.69h0A1.57,1.57,0,0,0,10.14,1.16Z"><animateTransform attributeName="transform" type="rotate" dur="0.75s" values="0 12 12;360 12 12" repeatCount="indefinite" /></path>
                                </svg>
                            )}
                            {awaitingResponse ? "Loading..." : "Submit"}
                        </button>
                    </form>
                ) : (
                    <form onSubmit={validateCode}>
                        <div className="relative mt-4 rounded-md shadow-sm max-w-xs mx-auto">
                            <input
                                required
                                type="text"
                                name="unlockCode"
                                id="unlockCode"
                                value={formData.unlockCode}
                                onChange={handleInputChange}
                                className="block w-full rounded-md border-0 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6 mx-auto text-center"
                                placeholder="12345678"
                                pattern="\d{8}"
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={awaitingResponse}
                            className="mt-3 inline-flex justify-center rounded-md bg-sky-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
                        >
                            {awaitingResponse && (
                                <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="mr-2">
                                    <path fill="#FFFFFF" d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z" opacity=".25" />
                                    <path fill="#FFFFFF" d="M10.14,1.16a11,11,0,0,0-9,8.92A1.59,1.59,0,0,0,2.46,12,1.52,1.52,0,0,0,4.11,10.7a8,8,0,0,1,6.66-6.61A1.42,1.42,0,0,0,12,2.69h0A1.57,1.57,0,0,0,10.14,1.16Z"><animateTransform attributeName="transform" type="rotate" dur="0.75s" values="0 12 12;360 12 12" repeatCount="indefinite" /></path>
                                </svg>
                            )}
                            {awaitingResponse ? "Loading..." : "Submit"}
                        </button>
                    </form>

                )}
                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                <p className="mt-8 text-sm text-gray-500">
                    This is a non-reversable action.
                    <br />
                    You will have to contact Support to change this later.
                </p>
                <div className="mt-10 flex items-center justify-center gap-x-6">
                    <Link
                        href="https://www.linkedin.com/company/halfnine-llc/"
                        target="_blank"
                        className="text-gray-400 hover:text-[#0077B5] scale-95 hover:scale-{1.02}"
                    >
                        <span className="sr-only">LinkedIn</span>
                        <FaLinkedin className="h-6 w-6" aria-hidden="true" />
                    </Link>
                    <Link
                        href="https://twitter.com/halfnine"
                        target="_blank"
                        className="text-gray-400 hover:text-black scale-100 hover:scale-{1.02}"
                    >
                        <span className="sr-only">Twitter</span>
                        <FaXTwitter className="h-6 w-6" aria-hidden="true" />
                    </Link>
                </div>
                <div className="mt-24 flex items-center justify-center gap-x-6">
                    <Link href="#" className="text-sm font-semibold text-gray-600">
                        Privacy Policy
                    </Link>
                    <Link href="#" className="text-sm font-semibold text-gray-600">
                        Terms of Service
                    </Link>
                </div>
                <p className="mt-4 text-center text-xs leading-5 text-gray-500">
                    &copy; {new Date().getFullYear()}{" "}
                    <Link href="https://www.halfnine.com" target="_blank">
                        Halfnine
                    </Link>{" "}
                    LLC. All rights reserved.
                </p>
            </div>
        </div>
    );
}

export default UpdateQr;