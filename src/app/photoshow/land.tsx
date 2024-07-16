"use client"

import React from 'react'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"


import UploadFile from '@/components/upload-file'
import ToolCard from '@/components/tool-card'

import Locale from '../../locales'

interface PropsData {
  file: File | undefined
  setFile: (file: File | undefined) => void
}

function PhotoshowLand({setFile}: PropsData) {
  return (
    <div id="photoshow-land" className='max-w-screen-md mx-auto'>

      <section className="title flex justify-center py-8 mt-8">
        <div className='flex items-center space-x-2'>
          <Image src="/logo.png" alt="logo" width={60} height={60}></Image>
          <h2 className='text-4xl font-bold'>AI图片全能工具箱</h2>
        </div>
      </section>

      <section className="upload w-full mt-8">
        <UploadFile setFile={setFile} />
        <div className="w-full text-sm text-center text-gray-400 mt-4">或</div>
        <div className="flex w-full items-center space-x-2 mt-4">
          <Input className='bg-white text-gray-500 text-sm' type="email" placeholder="请输入您想要生成的图片描述，直接生成" />
          <Button type="submit" size="sm" className='bg-violet-500 px-6 text-sm'>生成</Button>
        </div>
      </section>

      <section className="example mt-8">
        <div className="w-full text-sm text-center text-gray-400">现已支持</div>
        <ul className="w-full mt-4 grid grid-cols-2 gap-x-4 gap-y-2 sm:gap-x-8 sm:gap-y-4">
          {
            Locale.Photo.Example.list.map((item, index) =>
            (
              <li key={index}>
                <ToolCard icon={item.icon} title={item.title} desc={item.desc} />
              </li>
            )
            )
          }

        </ul>
      </section>

    </div>
  )
}

export default PhotoshowLand