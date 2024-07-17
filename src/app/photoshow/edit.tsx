"use client"

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ScrollArea } from "@/components/ui/scroll-area"
import ToolCard from '@/components/tool-card'
import Locale from '@/locales'

const tools = Locale.Photo.Tool.list

interface PropsData {
  file: File | undefined
  setFile: (file: File | undefined) => void
}

function PhotoshowEdit({ file, setFile }: PropsData) {
  const [tool, setTool] = React.useState<any>(tools[0])
  const [src, setSrc] = useState('')

  React.useEffect(() => {
    if (file) {
      console.log('file::', file)
      const url = URL.createObjectURL(file)
      setSrc(url)
    }
  }, [file])


  return (
    <div id="photosho-edit" className='max-w-screen-2xl h-full mx-auto flex border shadow-lg overflow-hidden rounded-xl'>

      <div className="left w-[310px] h-full p-4 bg-white shadow-2xl flex flex-col">

        <div className="w-full flex items-center space-x-2 py-2 bg-white/55">
          <Image width={40} height={40} alt="logo" src="/logo.png"></Image>
          <p className='font-medium text-xl md:text-2xl'>AI图片全能工具箱</p>
        </div>

        <div className="grow relative">
          <div className="absolute top-0 left-0 w-full h-full">
            <ScrollArea className="w-full h-full">
              <ul className="w-full space-y-4 ">
                {
                  tools.map((it, idx) => (
                    <li key={idx} onClick={() => setTool(it)}>
                      <ToolCard active={it.title === tool.title} icon={it.icon} title={it.title} desc={it.desc}></ToolCard>
                    </li>
                  ))
                }
              </ul>
            </ScrollArea>
          </div>


        </div>

      </div>

      <div className="right flex-1 h-full px-12 py-6 flex flex-col space-y-4">
        <div className="info text-md text-primary">
          <span className='font-medium'>AI全能工具箱 </span>
          <span className='italic'>{`> ${tool.title}`}</span>
        </div>
        {/* <div className="show grow border-solid border-[4px] border-white bg-white rounded-md p-2"> */}
        <div className="show bg-white p-2 rounded-md">
          <Image width={200} height={200} alt="image" src={src} className='w-full'></Image>
        </div>
        <div className="action flex justify-between">
          <Button variant="outline" className='border-primary text-primary' onClick={() => setFile(undefined)}>退出</Button>
          <Button variant="default">开始</Button>
        </div>
      </div>

    </div>
  )
}

export default PhotoshowEdit