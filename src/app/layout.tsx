import "./globals.css";
import type { Metadata } from "next";
import clsx from "clsx";
import Navbar from "@/components/qr/navbar";
import Container from "@/components/container";

import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Casente | QR code service",
    template: "%s | Casente QR",
  },
  description: "This is a QR code service for Casente.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    noimageindex: true,
    noarchive: true,
    nosnippet: true,
    notranslate: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={clsx("bg-stone-100", inter.className)}>{children}</body>
    </html>
  );
}
