"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { SiX, SiGithub, SiDiscord } from "react-icons/si";
import Image from "next/image";
// import { useConfigStore } from "@/stores";

export function Footer() {
  // const { domain } = useConfigStore();
  const domain = 'https://302.ai'

  return (
    <footer className="w-full flex fixed bottom-0 right-0 p-1 z-20 bg-background/95">
      <div className="flex flex-col items-center justify-center p-0 w-full">
        <div className="flex z-50">
          <a href={domain} target="_blank" className="flex p-1 space-x-2" style={{ textDecoration: "none" }}>
            <div className="title text-xs text-[#666]">
              Powered By
            </div>
            <div className="banner flex items-center">
              <Image width={50} height={14} src="/banner.png" alt="" />
            </div>
          </a>
        </div>
        <div className="flex justify-center text-center text-xs text-gray-400 ">
          内容由AI生成，仅供参考
        </div>
      </div>
    </footer>
  );
}
