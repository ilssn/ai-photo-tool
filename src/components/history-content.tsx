"use client";

import * as React from "react";
import Image from "next/image";
import { ScrollArea } from "@/components/ui/scroll-area"
import { getHistorys, updHistorys } from "@/app/photoshow/query";
import { Button } from "./ui/button";
import SystemManager from "@/utils/System";

import { MdOutlineCleaningServices } from "react-icons/md";

import { RiDownload2Fill } from "react-icons/ri";
import { BUILD_ID_FILE } from "next/dist/shared/lib/constants";

export function HistoryContent() {
  const historys = getHistorys()
  const [showList, setShowList] = React.useState(historys)

  if (!historys.length) return "暂无数据！";
  
  const handleCleanUp =  () => {
    updHistorys([])
    setShowList([])
  }

  return (
    <div className="w-full">
      <div className="flex justify-between items-center">
        <div className="left flex-1 text-slate-500 text-sm">
          {`总共${showList.length}条生成记录`}
        </div>
        <div className="width">
          <Button size={'sm'} onClick={() => handleCleanUp()}>
            <MdOutlineCleaningServices />
            清空
          </Button>
        </div>
      </div>

      <ScrollArea className="h-[300px] w-full rounded-md border p-4 mt-2">
        <ul className="text-sm space-y-4">
          {
            showList.map((it: any, idx: number) => {
              return <li key={idx}>
                <div className="w-full flex flex-col  items-center p-2 bg-slate-200 rounded-md space-y-1">
                  <div className="w-full flex space-x-2">
                    <div className="bg-white rounded-sm overflow-hidden">
                      <Image width={80} height={40} alt={"result image"} src={it.result} />
                    </div>
                    <div className="flex-1 flex flex-col justify-start space-y-2 ">
                      <div className="font-medium text-primary text-base">{it.tool.title}</div>
                      <div className="text-sm text-slate-500">{SystemManager.formatTimestamp(it.id)}</div>
                    </div>
                    <div className="flex items-start">
                      <Button size={"sm"} onClick={() => SystemManager.downloadImage(it.result)}>
                        <RiDownload2Fill />
                        下载
                      </Button>
                    </div>

                  </div>
                  <div className="w-full text-xs text-slate-400">{it.action.payload.prompt}</div>
                </div>
              </li>
            })
          }
        </ul>
      </ScrollArea>
    </div>


  );
}
