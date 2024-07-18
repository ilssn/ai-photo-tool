"use client"

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ScrollArea } from "@/components/ui/scroll-area"
import ToolCard from '@/components/tool-card'
import { Tool } from '@/types'
import Locale from '@/locales'

// import { RiDownloadFill } from "react-icons/ri";
import { RiDownload2Fill } from "react-icons/ri";

import ToolRemoveBg from '@/components/tool-remove-bg'

import { generateImage } from './query'

import SystemManager from '@/utils/System'

const tools = Locale.Photo.Tool.list

interface PropsData {
  tool: Tool
  setTool: (tool: Tool) => void
  file: File | null
  setFile: (file: File | null) => void
}

function PhotoshowEdit({ tool, setTool, file, setFile }: PropsData) {
  const [src, setSrc] = useState('')
  const [result, setResult] = useState('')
  const [status, setStatus] = useState<'Ready' | 'Pending' | 'Done' | 'Finish'>('Ready')

  React.useEffect(() => {
    if (file) {
      console.log('file::', file)
      const url = URL.createObjectURL(file)
      setSrc(url)
    }
  }, [file])

  React.useEffect(() => {
    console.log('task::status::', status)
    if (status === 'Finish') {
      setFile(null)
    }
  }, [status])

  // 生成图片
  const handlerOngenerateImage = async (action: any) => {
    try {
      const res = await generateImage(action)
      console.log('suc::', res)
      return res
    } catch (error) {
      console.log('error::', error)
      return null
    }

  }

  if (!src) return <>Loading...</>
  return (
    <div id="photosho-edit" className='max-w-screen-2xl h-full mx-auto flex border shadow-lg overflow-hidden rounded-xl'>

      <div className="left w-[310px] h-full p-4 bg-white shadow-2xl flex flex-col">
        <div className="w-full flex items-center space-x-2 py-2">
          <Image width={40} height={40} alt="logo" src="/logo.png"></Image>
          <p className='font-medium text-xl md:text-2xl'>AI图片全能工具箱</p>
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
      </div>

      <div className="right flex-1 h-full px-12 py-4 flex flex-col space-y-4">

        <div className="w-full flex justify-between items-center">
          <div className="info text-md text-primary">
            <span className='font-medium'>AI全能工具箱 </span>
            <span className='italic'>{`> ${tool.title}`}</span>
          </div>
          <Button disabled={!result} variant="default" size={"sm"} onClick={() => SystemManager.downloadImage(result)}>
            <RiDownload2Fill />
            <span>下载</span>
          </Button>
        </div>

        <div className="w-full grow flex items-center">
          <ToolRemoveBg
            onGenerateImage={handlerOngenerateImage}
            src={src}
            setSrc={setSrc}
            result={result}
            setResult={setResult}
            status={status}
            setStatus={setStatus} />
        </div>


      </div>

    </div>
  )
}

export default PhotoshowEdit