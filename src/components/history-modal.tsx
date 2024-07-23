"use client";

import * as React from "react";
import { MdHistory } from "react-icons/md";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { HistoryContent } from "./history-content";

export function HistoryModal() {
  return (
    <Dialog>
      <DialogTrigger>
      <MdHistory className="h-[1.4rem] w-[1.4rem] rotate-0 scale-100" />
      </DialogTrigger>
      <DialogContent className="max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            历史记录
          </DialogTitle>
          <DialogDescription className="hidden">
            图片生成记录
          </DialogDescription>
        </DialogHeader>
        <HistoryContent />
      </DialogContent>
    </Dialog>
  );
}
