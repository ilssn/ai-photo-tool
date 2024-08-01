"use client"

import React, { useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ScrollArea } from "@/components/ui/scroll-area"
import ToolCard from '@/components/tool-card'
import ImageTransfer from '@/components/image-transfer'
import UploadButton from '@/components/upload-button'
import { HistoryModal } from "@/components/history-modal";
import { SideSheet } from '@/components/side-sheet'
import { ToolIcon } from '@/components/my-icon'
import { Tool, Status, History } from '@/types'
import Locale from '@/locales'
import { twMerge } from 'tailwind-merge'

import { RiDownload2Fill } from "react-icons/ri";

import { uploadImage, generateImage, generateVideo, generateText, getHistorys, updHistorys } from './query'

import SystemManager from '@/utils/System'
import ImageManager from '@/utils/Image'
import { MdModal } from '@/components/md-modal'

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
  const [videoSrc, setVideoSrc] = React.useState('')
  const [textContent, setTextContent] = React.useState('')

  const readRef = React.useRef(null)

  React.useEffect(() => {
    const setMinSrc = async () => {
      if (file) {
        const blob = await ImageManager.compressImage(file, { maxSizeMB: 5 })
        const minFile = new File([blob], 'mini.png', {
          type: 'image/png',
        })
        const url = URL.createObjectURL(minFile)
        setSrc(url)
      }

    }
    setMinSrc()
  }, [file])

  React.useEffect(() => {
    if (status === 'Finish') {
      setFile(null)
    }
  }, [status])

  // 生成图片
  const handleOngenerateImage = async (src: string, action: any) => {
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
          video: '',
          text: '',
        }
        updHistorys([...historys, history])
        resolve(res)
      } catch (error) {
        console.log('error::', error)
        reject(error)
      }
    })
  }

  // 生成视频
  const handleOngenerateVideo = async (src: string, action: any) => {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await generateVideo(src, action)
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
          video: res.videoSrc,
          text: '',
        }
        updHistorys([...historys, history])
        // 返回结果
        resolve(res)
      } catch (error) {
        console.log('error::', error)
        reject(error)
      }
    })
  }


  // 生成文字
  const handleOngenerateText = async (src: string, action: any) => {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await generateText(src, action)
        // save history
        const historys = getHistorys() as History[]
        const history: History = {
          id: Date.now(),
          tool: tool,
          src,
          action,
          result: res.imageSrc,
          base64: '',
          video: '',
          text: res.textContent,
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
    <div id="photosho-edit" className='max-w-screen-xl h-full mx-auto flex md:border md:shadow-lg overflow-hidden md:rounded-xl relative'>

      <div className="md:hidden fixed top-2 left-4 z-50">
        <div className="flex items-center">
          <SideSheet status={status} tools={tools} tool={tool} setTool={setTool} file={file} setFile={setFile} />
        </div>
      </div>

      <div className="hidden md:block left w-[310px] h-full shadow-2xl">

        <div className="sider-bar w-full h-full p-4 bg-white flex flex-col">
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
                      <li key={idx} onClick={() => setTool(it)} className={status === 'Pending' ? 'pointer-events-none opacity-60 ' : ''}>
                        <ToolCard active={it.id === tool.id} icon={it.icon} title={it.title} desc={it.desc}></ToolCard>
                      </li>
                    ))
                  }
                  {/* <li className='w-full h-0'></li> */}
                </ul>
              </ScrollArea>
            </div>
          </div>
          <div className={twMerge('w-full pt-4 bg-white', status === 'Pending' ? 'pointer-events-none opacity-60' : '')}>
            <UploadButton setFile={setFile} />
          </div>
        </div>

      </div>

      <div className="right flex-1 h-full md:px-12 md:py-4 flex flex-col space-y-4">

        <div className="w-full flex justify-between items-center">
          <div className="block md:hidden info text-md text-primary">
            <div className="w-full flex space-x-2 items-center justify-start border-b-2 border-slate-200 ">
              <span className='py-1'>
                <ToolIcon icon={tool.icon} />
              </span>
              <span className='font-medium '>{tool.title}</span>
            </div>
          </div>
          <div className="hidden md:block info text-md text-primary">
            <span className='font-medium'>{'AI图片工具箱 > '}</span>
            <span className='italic'>{tool.title}</span>
          </div>
          <div className="flex space-x-4 items-center">
            {!['read-text', 'create-video'].includes(tool.name) &&
              <Button disabled={!result} variant="default" size={"sm"} onClick={() => SystemManager.downloadImage(result)}>
                <RiDownload2Fill />
                <span>下载</span>
              </Button>
            }
            {['create-video'].includes(tool.name) &&
              <Button disabled={!videoSrc} variant="default" size={"sm"} onClick={() => SystemManager.downloadVideo(videoSrc)}>
                <RiDownload2Fill />
                <span>下载</span>
              </Button>
            }
            {['read-text'].includes(tool.name) &&
              <MdModal trigger={readRef} content={textContent} confirm={() => SystemManager.copyToClipboard(textContent)} />
            }

            <div className="fixed top-3 right-12 z-[999] md:static">
              <div className="flex items-center">
                <HistoryModal setTool={setTool} setFile={setFile} />
              </div>
            </div>

          </div>
        </div>

        <div className="w-full grow flex items-center">
          {
            src &&
            <ImageTransfer
              file={file}
              tool={tool}
              readRef={readRef}
              // onUploadImage={uploadImage}
              onGenerateImage={handleOngenerateImage}
              onGenerateVideo={handleOngenerateVideo}
              onGenerateText={handleOngenerateText}
              src={src}
              setSrc={setSrc}
              status={status}
              setStatus={setStatus}
              result={result}
              setResult={setResult}
              videoSrc={videoSrc}
              setVideoSrc={setVideoSrc}
              textContent={textContent}
              setTextContent={setTextContent}
            />
          }
        </div>


      </div>

    </div>
  )
}

export default PhotoshowEdit