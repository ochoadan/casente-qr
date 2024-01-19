"use client";

import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Container from "../container";
import Logo from "../logo";
import Link from "next/link";

export default function Navbar() {
  return (
    <Disclosure as="nav" className="bg-white shadow">
      {({ open }) => (
        <>
          <Container>
            <div className="flex h-16 justify-between">
              <div className="flex">
                <div className="flex flex-shrink-0 items-center">
                  <Logo className="h-8 w-auto" />
                </div>
              </div>
              {/* <div className="hidden sm:ml-6 sm:flex sm:items-center space-x-4">
                <Link
                  href="#"
                  className="rounded-md px-3 py-2 text-sm font-semibold text-gray-900 hover:shadow-sm hover:bg-gray-50"
                >
                  Sign Out
                </Link>
              </div> */}
              <div className="-mr-2 flex items-center sm:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-sky-500">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </Container>

          <Disclosure.Panel className="sm:hidden">
            {/* <div className="space-y-1 pb-3 pt-2"> */}
            {/* <Disclosure.Button
                as="a"
                href="#"
                className="block border-l-4 border-sky-500 bg-sky-50 py-2 pl-3 pr-4 text-base font-medium text-sky-700"
              >
                Dashboard
              </Disclosure.Button> */}
            {/* <Disclosure.Button
                as="a"
                href="#"
                className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"
              >
                Shop now
              </Disclosure.Button>
            </div> */}
            <div className="border-t border-gray-200 pb-3 pt-4">
              <Disclosure.Button
                as="a"
                href="#"
                className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"
              >
                Contact Us
              </Disclosure.Button>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
