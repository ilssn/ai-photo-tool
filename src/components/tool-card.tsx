import React from 'react'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { twMerge } from 'tailwind-merge';
// import RemoveIcon from "../icons/test.svg";
import RemoveIcon from "../icons/rm-bg.svg";

interface PropsData {
  icon: string
  title: string
  desc: string
  active?: boolean
}

function ToolCard({icon, title, desc, active}: PropsData) {
  return (
    <Card className={twMerge(
      'cursor-pointer text-slate-600 hover:border-violet-500 hover:text-violet-500',
      active ? 'bg-violet-500 text-white hover:text-white' : ''
      )}>
      <CardHeader className='p-2'>
        <div className="w-full flex space-x-2 items-center">
          <RemoveIcon />
          <div className="flex-1">
            <CardTitle className='text-sm font-medium'>{title}</CardTitle>
            <div className="text-xs opacity-50">{desc}</div>
            {/* <CardDescription className='text-xs opacity-50'>{desc}</CardDescription> */}
          </div>
        </div>
      </CardHeader>
    </Card>
  )
}

export default ToolCard