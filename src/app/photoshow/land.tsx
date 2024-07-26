"use client"

import React from 'react'
import Image from 'next/image'
import UploadFile from '@/components/upload-file'
import ToolCard from '@/components/tool-card'
import { HistoryModal } from "@/components/history-modal";
import { Tool } from '@/types'
import Locale from '@/locales'

const tools = Locale.Photo.Tool.list

interface PropsData {
  tool: Tool
  setTool: (tool: Tool) => void
  file: File | null
  setFile: (file: File | null) => void
}

function PhotoshowLand({ setTool, file, setFile }: PropsData) {
  const uploadRef = React.useRef<HTMLDivElement | undefined>()

  const handleSeletTool = (it: Tool) => {
    setTool(it)
    uploadRef?.current?.click()
  }

  return (
    <div id="photoshow-land" className='max-w-screen-sm mx-auto'>
      <section className="title flex justify-center py-8 mt-8">
        <div className='flex items-center space-x-2'>
          <Image src="/logo.png" alt="logo" width={50} height={50}></Image>
          <h2 className='font-medium text-2xl md:text-4xl'>AI图片工具箱</h2>
        </div>
      </section>

      <section className="upload w-full mt-8">
        <UploadFile ref={uploadRef} file={file} setFile={setFile} />
        {/* <div className="w-full text-sm text-center text-slate-500 mt-4">或</div>
        <div className="flex w-full items-center space-x-2 mt-4">
          <Input className='bg-white text-slate-600 text-sm' type="email" placeholder="请输入您想要生成的图片描述，直接生成" />
          <Button type="submit" size="sm" className='px-6 text-sm'>生成</Button>
        </div> */}
      </section>

      <section className="example mt-8">
        <div className="w-full text-sm text-center text-slate-500">现已支持</div>
        <ul className="w-full mt-4 grid grid-cols-2 gap-x-4 gap-y-2 sm:gap-x-8 sm:gap-y-4">
          {
            tools.map((it, idx) =>
              <li
                className='h-16 sm:h-auto'
                key={idx} onClick={() => handleSeletTool(it)}>
                <ToolCard icon={it.icon} title={it.title} desc={it.desc} />
              </li>
            )
          }

        </ul>
      </section>

      <div className='fixed top-3 right-12 z-[999]'>
        <HistoryModal setTool={setTool} setFile={setFile} />

      </div>

    </div>
  )
}

export default PhotoshowLand