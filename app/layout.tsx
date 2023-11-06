import type { Metadata } from "next";
// import { ClerkProvider } from "@clerk/nextjs";
import { Outfit } from "next/font/google";

import Navbar from "@/app/(navbar)/Navbar";

import "./globals.css";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Book Taxi",
  description: "Book your taxi.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // <ClerkProvider>
    <html lang="en">
      <body className={outfit.className}>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
    // </ClerkProvider>
  );
}
