import type { Metadata } from "next";
import { Navbar } from "@/components/nav";
import { Footer } from "@/components/footer";
import { Inter } from "next/font/google";
import Providers from "@/providers";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI图片工具箱 - 302.AI",
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
        <Providers>
          <div id="root-layout" className="min-h-screen flex flex-col">
            <Navbar />
            <div id="layout-main" className="flex grow py-12">
              {children}
            </div>
            <Footer />
          </div>
        </Providers>

      </body>
    </html>
  );
}
