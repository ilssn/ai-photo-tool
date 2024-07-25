"use client"

import React, { useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ScrollArea } from "@/components/ui/scroll-area"
import ToolCard from '@/components/tool-card'
import ImageTransfer from '@/components/image-transfer'
import UploadButton from '@/components/upload-button'
import { HistoryModal } from "@/components/history-modal";
import { Tool, Status, History } from '@/types'
import Locale from '@/locales'

import { RiDownload2Fill } from "react-icons/ri";

import { generateImage, getHistorys, updHistorys } from './query'

import SystemManager from '@/utils/System'
import ImageManager from '@/utils/Image'

const tools = Locale.Photo.Tool.list

interface PropsData {
  tool: Tool
  setTool: (tool: Tool) => void
  file: File | null
  setFile: (file: File | null) => void
}

function PhotoshowEdit({ tool, setTool, file, setFile }: PropsData) {
  const [status, setStatus] = useState<Status>('Ready')
  const [src, setSrc] = useState('')
  const [result, setResult] = useState('')

  React.useEffect(() => {
    if (file) {
      const url = URL.createObjectURL(file)
      setSrc(url)
    }
  }, [file])

  React.useEffect(() => {
    if (status === 'Finish') {
      setFile(null)
    }
  }, [status])

  // 生成图片
  const handleOngenerateImage = async (action: any) => {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await generateImage(src, action)
        // remove canvas
        action.payload.canvas = null
        // remove mask
        action.payload.mask = null
        // save history
        const historys = getHistorys() as History[]
        const history: History = {
          id: Date.now(),
          tool: tool,
          src,
          action,
          result: res.imageSrc,
          base64: '',
        }
        updHistorys([...historys, history])
        resolve(res)
      } catch (error) {
        console.log('error::', error)
        reject(error)
      }

    })

  }


  if (!src) return <>Loading...</>
  return (
    <div id="photosho-edit" className='max-w-screen-xl h-full mx-auto flex border shadow-lg overflow-hidden rounded-xl relative'>

      <div className="left w-[310px] h-full p-4 bg-white shadow-2xl flex flex-col">

        <div className="w-full flex items-center justify-center space-x-2 py-2">
          <Image width={32} height={32} alt="logo" src="/logo.png"></Image>
          <p className='font-medium text-xl md:text-2xl'>AI图片工具箱</p>
        </div>

        <div className="grow relative mt-2">
          <div className="absolute top-0 left-0 w-full h-full">
            <ScrollArea className="w-full h-full">
              <ul className="w-full space-y-4 ">
                {
                  tools.map((it, idx) => (
                    <li key={idx} onClick={() => setTool(it)}>
                      <ToolCard active={it.id === tool.id} icon={it.icon} title={it.title} desc={it.desc}></ToolCard>
                    </li>
                  ))
                }
              </ul>
            </ScrollArea>
          </div>
        </div>
        <div className="w-full">
          <UploadButton setFile={setFile} setResult={setResult} />
        </div>
      </div>

      <div className="right flex-1 h-full px-12 py-4 flex flex-col space-y-4">

        <div className="w-full flex justify-between items-center">
          <div className="info text-md text-primary">
            <span className='font-medium'>AI图片工具箱 </span>
            <span className='italic'>{`> ${tool.title}`}</span>
          </div>
          <div className="flex space-x-4 items-center">
            <Button disabled={!result} variant="default" size={"sm"} onClick={() => SystemManager.downloadImage(result)}>
              <RiDownload2Fill />
              <span>下载</span>
            </Button>
            <div className="flex items-center">
              <HistoryModal setTool={setTool} setFile={setFile} />
            </div>
          </div>
        </div>

        <div className="w-full grow flex items-center">
          {
            src &&
            <ImageTransfer
              file={file}
              tool={tool}
              onGenerateImage={handleOngenerateImage}
              src={src}
              setSrc={setSrc}
              status={status}
              setStatus={setStatus}
              result={result}
              setResult={setResult}
            />
          }
        </div>


      </div>

    </div>
  )
}

export default PhotoshowEdit