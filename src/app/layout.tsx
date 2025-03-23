import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/utils/Navbar";
import Footer from "@/components/utils/Footer";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow px-30 py-14 w-full">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}