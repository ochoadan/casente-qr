import Container from "@/components/container";
import Navbar from "@/components/qr/navbar";
import Link from "next/link";
import { FaLinkedin, FaXTwitter } from "react-icons/fa6";

const Page = () => {
  return (
    <>
      <Navbar />
      <Container>
        <div className="grid min-h-full place-items-center py-24 sm:py-32">
          <div className="text-center">
            <p className="text-base font-semibold text-sky-600">Casente</p>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Update your QR Code
            </h1>
            <p className="mt-6 text-base leading-7 text-gray-600">
              Enter the code you received with your purchase to update your QR
              code:
            </p>
            <form action="">
              <div className="relative mt-4 rounded-md shadow-sm max-w-xs mx-auto">
                <input
                  type="text"
                  name="purchase-code"
                  id="purchase-code"
                  className="block w-full rounded-md border-0 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6 mx-auto text-center"
                  placeholder="0000-0000"
                />
              </div>
              <button
                type="submit"
                className="mt-3 rounded-md bg-sky-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
              >
                Submit
              </button>
            </form>
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
      </Container>
    </>
  );
};

export default Page;
