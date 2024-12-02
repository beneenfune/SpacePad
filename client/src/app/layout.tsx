"use client"; // This marks the component as a Client Component

import localFont from "next/font/local";
import { PageFormatProvider } from "../context/PageFormatContext"; // Correct the import path if necessary
import { metadata } from "./metadata"; // Adjust the import path as needed
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <PageFormatProvider>{children}</PageFormatProvider>
      </body>
    </html>
  );
}

// Note: metadata is not included here anymore.
