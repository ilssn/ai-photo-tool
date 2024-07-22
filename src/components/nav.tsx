"use client";

import Link from "next/link";
import { Button } from "./ui/button";
// import { useConfigStore } from "@/stores";
import { useRouter } from "next/navigation";
import { InfoModal } from "./info-modal";
import { HistoryModal } from "./history-modal";


export function Navbar() {
  const router = useRouter();
  // const { token } = useConfigStore();

  return (
    <header className="w-full flex fixed p-1 z-50 px-2 bg-background/95 justify-between items-center ">
      <div className="flex items-center gap-2">
      </div>
      <div className="flex items-center gap-4 p-2">
        <HistoryModal />
        <InfoModal />
      </div>
    </header>
  );
}
