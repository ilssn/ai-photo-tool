import React from 'react'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { RiImageEditLine } from "react-icons/ri";

import { twMerge } from 'tailwind-merge';

import RemoveBgIcon from "../icons/remove-bg.svg";
import RemoveObjIcon from "../icons/remove-obj.svg";
import ReplaceBgIcon from "../icons/replace-bg.svg";
import VectorizeIcon from "../icons/vectorize.svg";
import UpscaleIcon from "../icons/upscale.svg";
import SuperUpscaleIcon from "../icons/super-upscale.svg";
import ColorizeIcon from "../icons/colorize.svg";
import SwapFaceIcon from "../icons/swap-face.svg";
import UncropIcon from "../icons/uncrop.svg";
import InpaintIcon from "../icons/inpaint-img.svg";
import RecreateImgIcon from "../icons/recreate-img.svg";
import SketchImgIcon from "../icons/sketch-img.svg";
import CropImgIcon from "../icons/crop-img.svg";
import FilterImgIcon from "../icons/filter-img.svg";


interface PropsData {
  icon: string
  title: string
  desc: string
  active?: boolean
}

function MachIcon({ icon }: { icon: string }) {
  switch (icon) {
    case 'remove-bg':
      return <RemoveBgIcon />
    case 'remove-obj':
      return <RemoveObjIcon />
    case 'replace-bg':
      return <ReplaceBgIcon />
    case 'vectorize':
      return <VectorizeIcon />
    case 'upscale':
      return <UpscaleIcon />
    case 'super-upscale':
      return <SuperUpscaleIcon />
    case 'colorize':
      return <ColorizeIcon />
    case 'swap-face':
      return <SwapFaceIcon />
    case 'uncrop':
      return <UncropIcon />
    case 'inpaint-img':
      return <InpaintIcon />
    case 'recreate-img':
      return <RecreateImgIcon />
    case 'sketch-img':
      return <SketchImgIcon />
    case 'crop-img':
      return <CropImgIcon />
    case 'filter-img':
      return <FilterImgIcon />
    default:
      return <RiImageEditLine className='w-8 h-8' />
  }
}

function ToolCard({ icon, title, desc, active }: PropsData) {

  return (
    <Card className={twMerge(
      'cursor-pointer text-slate-600 hover:border-violet-500 hover:text-violet-500 h-full',
      active ? 'bg-violet-500 text-white hover:text-white' : ''
    )}>
      <CardHeader className='p-2'>
        <div className="w-full flex space-x-2 items-start sm:items-center">
          <MachIcon icon={icon}/>
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