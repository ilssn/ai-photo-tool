import React from 'react'
import { Input } from "@/components/ui/input"
import Image from 'next/image'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { twMerge } from 'tailwind-merge'

interface PropsData {
  title: string
  status: string
  payload: any
  setPayload: (data: any) => void
  confirm: () => void
}

const characters = [
  {
    label: '高级定制插图',
    value: 'Haute Couture Illustration',
    icon: '/images/c01.png'
  },
  {
    label: '超现实科幻插图',
    value: 'Surreal Sci-Fi Realism Illustration',
    icon: '/images/c02.png'
  },
  {
    label: '黑白木刻版画',
    value: 'Black and White Blockprint',
    icon: '/images/c03.png'
  },
  {
    label: '双子座漫画',
    value: 'Gemini Manga',
    icon: '/images/c04.png'
  },
  {
    label: '小微木刻版画',
    value: 'Little Tinies Blockprint',
    icon: '/images/c05.png'
  },
  {
    label: '波普艺术插图',
    value: 'Pop Art Illustration',
    icon: '/images/c06.png'
  },
  {
    label: '点插图',
    value: 'The Point Illustration',
    icon: '/images/c07.png'
  },
  {
    label: '柔焦3D',
    value: 'Soft Focus 3D',
    icon: '/images/c08.png'
  },
  {
    label: '绘画插图',
    value: 'Painted Illustration',
    icon: '/images/c09.png'
  },
  {
    label: '彩色漫画',
    value: 'Colorful Comicbook',
    icon: '/images/c10.png'
  },
  {
    label: '粗线条',
    value: 'Bold Lineart',
    icon: '/images/c11.png'
  },
  {
    label: '柔和动漫插图',
    value: 'Soft Anime Illustration',
    icon: '/images/c12.png'
  },
]


export function CharacterModal({ title, status, payload, setPayload, confirm }: PropsData) {

  const handleChange = (target: any) => {
    setPayload((preData: any) => { return { ...preData, character: target.value } });
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="default" disabled={status === 'Pending'}>{title}</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className='space-x-2'>
            <span>选择滤镜:</span>
            <span className='text-primary underline '>{`${characters.find(it => it.value === payload.character)?.label}`}</span>
          </AlertDialogTitle>
          <AlertDialogDescription>
            选择以下任意一个风格滤镜进行生成
          </AlertDialogDescription>
          <div className='w-full grid grid-cols-4 grid-rows-3 gap-4'>
            {
              characters.map((it, idx) => {
                return (
                  <div
                    key={idx}
                    onClick={() => handleChange(it)}
                    className={
                      twMerge(
                        'relative cursor-pointer text-white hover:opacity-100 hover:text-primary border-4 rounded-sm overflow-hidden ',
                        it.value === payload.character ? 'opacity-100 border-primary  text-primary' : 'opacity-100'
                      )
                    }
                  >
                    <Image
                      width={100}
                      height={100}
                      alt='character image' src={it.icon}
                      className={twMerge('w-full h-auto hover:scale-110', it.value === payload.character ? 'scale-110' : '')}
                    />
                    <div className="absolute w-full bottom-0 left-0 p-1 bg-black/80 text-center text-xs ">
                      {it.label}
                    </div>
                  </div>
                )
              })
            }
          </div>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>取消</AlertDialogCancel>
          <AlertDialogAction onClick={confirm}>确认</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
