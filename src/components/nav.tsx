"use client";

import Link from "next/link";
import { Button } from "./ui/button";
// import { useConfigStore } from "@/stores";
import { useRouter } from "next/navigation";
import { InfoModal } from "./info-modal";
import { HistoryModal } from "./history-modal";
import Image from "next/image";


export function Navbar() {
  const router = useRouter();
  // const { token } = useConfigStore();

  return (
    <header className="w-full h-12 flex fixed bg-background/95 z-20 justify-between items-center px-2 py-1 shadow-sm md:shadow-none md:py-1">
      <div className="flex items-center gap-4 p-2">
        {/* <div className="md:hidden flex items-center">
          <InfoModal />
        </div> */}
      </div>
      {/* <div className="md:hidden flex items-center justify-center space-x-2">
        <Image width={32} height={32} alt="logo" src="/logo.png"></Image>
        <p className='font-medium text-xl md:text-2xl'>AI图片工具箱</p>
      </div> */}
      {/* <div className="flex items-center gap-4 p-2">
        <InfoModal />
      </div> */}
    </header>
  );
}
