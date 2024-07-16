"use client";

import * as React from "react";
import { IoMdInformationCircleOutline } from "react-icons/io";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
// import { InfoContent } from "./info-content";

export function InfoModal() {
  return (
    <Dialog>
      <DialogTrigger>
      <IoMdInformationCircleOutline className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100" />
      </DialogTrigger>
      <DialogContent className="max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            关于
          </DialogTitle>
          <DialogDescription className="">
            图片全能工具箱
          </DialogDescription>
        </DialogHeader>
        {/* <InfoContent /> */}
      </DialogContent>
    </Dialog>
  );
}
