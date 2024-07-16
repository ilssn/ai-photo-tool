import type { Metadata } from "next";
import { Navbar } from "@/components/nav";
import { Footer } from "@/components/footer";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI Photoshow - 302.AI",
  description: "The Photo Generation Tool Powered By 302.AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div id="root-layout" className="min-h-screen bg-[#f5f5f5] flex flex-col">
          <Navbar />
          <div id="layout-main" className="flex grow">
            {children}
          </div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
