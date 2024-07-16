import React from 'react'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"

import UploadFile from '@/components/upload-file'
import { IoImagesOutline } from "react-icons/io5";

const Example = {
  title: '现已支持',
  action: '试一试',
  list: [
    {
      icon: '',
      title: '去除背景',
      desc: '精确提取图片中主体',
    },
    {
      icon: '',
      title: '物体消除',
      desc: '擦掉您想要移除的区域',
    },
    {
      icon: '',
      title: '背景替换',
      desc: '以当前图片为基础，生成一张新的图片',
    },
    {
      icon: '',
      title: '图片矢量化',
      desc: '将图片转化为可无限放大的矢量图',
    },
    {
      icon: '',
      title: '图片放大',
      desc: '支持2x，4x，8x放大图片',
    },
    {
      icon: '',
      title: '超级图片放大',
      desc: '对图片进行AI生成，添加原图没有的细节',
    },
    {
      icon: '',
      title: '黑白上色',
      desc: '对黑白照片进行上色',
    },
    {
      icon: '',
      title: 'AI换脸',
      desc: '更换图片人物的脸',
    },
    {
      icon: '',
      title: '图片拓展',
      desc: '将图片的边界进行拓展',
    },
    {
      icon: '',
      title: '图片修改',
      desc: '将图片的内容进行AI修改',
    },
    {
      icon: '',
      title: '以图生图',
      desc: '以当前图片为基础，生成一张新的图片',
    },
    {
      icon: '',
      title: '草稿生图',
      desc: '将一张手稿生成一个精美的图片',
    },
  ]
}


function PhotoshowLand() {
  return (
    <div id="photoshow-land" className='max-w-screen-md mx-auto p-4'>

      <section className="title flex justify-center py-8 mt-8">
        <div className='flex items-center space-x-2'>
          <Image src="/logo.png" alt="logo" width={60} height={60}></Image>
          <h2 className='text-4xl font-bold'>图片全能工具箱</h2>
        </div>
      </section>

      <section className="upload w-full mt-8">
        <UploadFile />
        <div className="w-full text-md text-center text-gray-400 mt-4">或</div>
        <div className="flex w-full items-center space-x-2 mt-4">
          <Input className='bg-white text-gray-500 text-md' type="email" placeholder="请输入您想要生成的图片描述，直接生成" />
          <Button type="submit" size="sm" className='bg-violet-500 px-6'>生成</Button>
        </div>
      </section>

      <section className="example mt-8">
        <div className="w-full text-md text-center text-gray-400">现已支持</div>
        <ul className="w-full mt-4 grid grid-cols-2 gap-x-8 gap-y-4">
          {
            Example.list.map((item, index) => {
              return (
                <li key={index}>
                  <Card className='cursor-pointer text-gray-700 hover:text-violet-500'>
                    <CardHeader className='p-4'>
                      <div className="w-full flex space-x-4">
                        <IoImagesOutline className='w-8 h-8' />
                        <div className="flex-1">
                          <CardTitle className='font-medium'>{item.title}</CardTitle>
                          <CardDescription className='opacity-70'>{item.desc}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                </li>
              )
            })
          }

        </ul>
      </section>

    </div>
  )
}

export default PhotoshowLand