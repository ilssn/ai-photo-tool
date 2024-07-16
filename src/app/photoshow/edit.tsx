"use client"

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import ToolCard from '@/components/tool-card'
import Locale from '@/locales'

const tools = Locale.Photo.Example.list

interface PropsData {
  file: File | undefined
  setFile: (file: File | undefined) => void
}

function PhotoshowEdit({file, setFile}: PropsData) {
  const [tool, setTool] = React.useState<any>(tools[0])
  const [src, setSrc] = useState('')

  React.useEffect(() => {
    if(file) {
      console.log('file::', file)
      const url = URL.createObjectURL(file)
      setSrc(url)
    }
  },[file])
  

  return (
    <div id="photosho-edit" className='max-w-screen-2xl h-full mx-auto flex border shadow-lg overflow-hidden'>
      <div className="left w-[310px] h-full p-4 bg-white shadow-2xl">
        <ul className="w-full space-y-4 ">
          <li className='w-full'>
            <div className="w-full flex items-center space-x-2">
              <Image width={40} height={40} alt="logo" src="/logo.png"></Image>  
              <p className='text-xl font-bold'>AI图片全能工具箱</p>
            </div>
          </li>
          {
            Locale.Photo.Example.list.map((it, idx) => (
              <li key={idx} onClick={() => setTool(it)}>
                <ToolCard active={it.title === tool.title} icon={it.icon} title={it.title} desc={it.desc}></ToolCard>
              </li>
            ))
          }
        </ul>
      </div>

      <div className="right flex-1 h-full px-12 py-12 flex flex-col space-y-4">
        <div className="info text-md text-primary">
          <span className='font-bold'>AI全能工具箱 </span>
          <span className='italic'>{`> ${tool.title}`}</span>
        </div>
        {/* <div className="show grow border-solid border-[4px] border-white bg-white rounded-md p-2"> */}
        <div className="show border-solid border-[4px] border-white bg-white rounded-md p-2">
          <Image width={200} height={200} alt="image" src={src} className='w-full'></Image>
          {/* <Image fill alt="image" src={src}></Image> */}
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