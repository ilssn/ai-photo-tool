import React from 'react'
import NextImage from 'next/image'
import { twMerge } from 'tailwind-merge'
import { Button } from '@/components/ui/button'
import ImageCompare from './image-compare'
import ImageCropper from './image-cropper'
import ScaleBar from './scale-bar'
import UploadBar from './upload-bar'
import PromptBar from './prompt-bar'
import LightBar from './light-bar'
import AlertBar from './alert-bar'
import { updTask } from '@/app/photoshow/query'
import { Tool, Status } from '@/types'
import { PHOTO_DEFAULT_PAYLOAD } from '@/constants'
import ImageManager from '@/utils/Image'

interface PropsData {
  tool: Tool
  onGenerateImage: (action: any) => Promise<any>
  src: string
  setSrc: (src: string) => void
  status: string
  setStatus: (status: Status) => void
  result: string
  setResult: (result: string) => void
}

function ImageTransfer({ tool, onGenerateImage, src, setSrc, status, setStatus, result, setResult, }: PropsData) {
  const [maxWidth, setMaxWidth] = React.useState('1200px')
  const [errorInfo, setErrorInfo] = React.useState<any>(null)
  const [payload, setPayload] = React.useState<any>(PHOTO_DEFAULT_PAYLOAD)
  const [originSrc, setOriginSrc] = React.useState('')

  const handleStart = async () => {
    try {
      setStatus('Pending')
      const res = await onGenerateImage({ type: tool.name, payload, })
      // 基础图片容器设置结果
      setResult(res.imageSrc)
      // 高阶图片容器缓存原图，因为图片尺寸有变化
      if (['crop-img'].includes(tool.name)) {
        setOriginSrc(src)
        setSrc(res.imageSrc)
      }
      setStatus('Done')
    } catch (error) {
      setErrorInfo(error)
      setStatus('Error')
    }
  }

  const handleRestart = async () => {
    if(['crop-img'].includes(tool.name)) {
      setSrc(originSrc)
      setResult('')
      setStatus('Ready')
      return
    }
    setResult('')
    handleStart()
  }

  const handleStop = async () => {
    updTask({})
    setStatus('Finish')
  }

  const handleReset = async () => {
    if (result) {
      const localSrc = await ImageManager.localizeImage(result) as string
      setSrc(localSrc)
      setResult('')
    }
    setStatus('Ready')
    setPayload(PHOTO_DEFAULT_PAYLOAD)
    updTask({})
  }

  React.useEffect(() => {
    handleReset()
  }, [tool])

  React.useEffect(() => {
    setMaxWidth('1200px')
    const img = new Image()
    img.src = src
    img.onload = () => {
      if (img.width && img.height) {
        const scale = Number(img.height) / Number(img.width)
        if (scale > 1) {
          setMaxWidth('700px')
        }
        if (scale > 1.3) {
          setMaxWidth('600px')
        }
        if (scale > 1.5) {
          setMaxWidth('500px')
        }
        if (scale > 1.6) {
          setMaxWidth('400px')
        }
      }
    }
    img.onerror = () => {
      console.log('Load image error')
    }
  }, [src])


  return (
    <div id="image-transfer" className="w-full h-full space-y-4 flex flex-col">
      {/* 占位区 */}
      <div className="w-full h-0"></div>

      {/* 展示区 */}
      <div className="show w-full grow flex flex-col justify-center items-center space-y-4">
        {/* 错误信息 */}
        {status === 'Error' &&
          <AlertBar errInfo={errorInfo} />
        }
        {/* 图片容器 */}
        <div className="w-full rounded-xl overflow-hidden " style={{ maxWidth: maxWidth }}>
          {/* 基础通用图片容器 */}
          {!['crop-img'].includes(tool.name) &&
            <div className="w-full mosaic-bg relative">
              <NextImage width={200} height={200} alt="image" src={src}
                className={twMerge('w-full h-auto m-auto', result ? 'opacity-0' : '')}
              >
              </NextImage>

              {status === 'Pending' &&
                <div className={twMerge('scan w-full absolute top-0 transition-all duration-200 pointer-events-none',)}>
                </div>
              }

              {result &&
                <div className='w-full absolute top-0'>
                  <ImageCompare
                    beforeSrc={src}
                    afterSrc={result}
                    initPosition={30}
                  />
                </div>
              }
            </div>
          }
          {/* 高级定制图片容器 */}
          {['crop-img'].includes(tool.name) &&
            <div className="w-full mosaic-bg relative">
              <NextImage width={200} height={200} alt="image" src={src}
                className={twMerge('w-full h-auto m-auto', result ? 'opacity-0' : '')}
              >
              </NextImage>


              <div className={twMerge("absolute top-0 left-0 w-full h-full", result ? 'opacity-0' : '')}>
                <ImageCropper src={src} setSrc={setSrc} setPayload={setPayload} />
              </div>

              {status === 'Pending' &&
                <div className={twMerge('scan w-full absolute top-0 transition-all duration-200 pointer-events-none',)}>
                </div>
              }

              {result &&
                <div className='w-full absolute top-0'>
                  <img width={200} height={200} alt="image" src={result} className={
                    twMerge('w-full h-auto m-auto')}
                  >
                  </img>
                </div>
              }

            </div>
          }

        </div>

        {/* 状态参数 */}
        <div className="w-full justify-center items-center space-y-4">
          {status === 'Pending' &&
            <div className='text-center text-sm text-violet-500'>
              图片生成中，请耐心等待1-5分钟~
            </div>
          }

          {status !== 'Pending' &&
            <div className="w-full">
              {tool.name === 'upscale' &&
                <ScaleBar payload={payload} setPayload={setPayload} />
              }
              {tool.name === 'super-upscale' &&
                <div className="w-full flex space-x-4 flex-col space-y-2">
                  <ScaleBar payload={payload} setPayload={setPayload} />
                  <PromptBar payload={payload} setPayload={setPayload} />
                </div>
              }
              {tool.name === 'swap-face' &&
                <UploadBar payload={payload} setPayload={setPayload} />
              }
              {tool.name === 'recreate-img' &&
                <PromptBar payload={payload} setPayload={setPayload} />
              }
              {tool.name === 'inpaint-img' &&
                <PromptBar payload={payload} setPayload={setPayload} />
              }
              {tool.name === 'sketch-img' &&
                <PromptBar payload={payload} setPayload={setPayload} />
              }
              {tool.name === 'replace-bg' &&
                <div className="w-full flex space-x-4 flex-col space-y-2">
                  <LightBar payload={payload} setPayload={setPayload} />
                  <PromptBar
                    payload={payload}
                    setPayload={setPayload}
                    placeHolder="请输入背景图描述"
                  />
                </div>
              }
            </div>
          }
        </div>

      </div>


      {/* 操作区 */}
      <div className="action flex justify-between space-x-4">
        <Button variant="outline" className='border-primary text-primary' onClick={handleStop}>
          退出
        </Button>

        {status === 'Done' || status === 'Error'
          ?
          <Button variant="default" onClick={handleRestart}>
            {['crop-img'].includes(tool.name) ? '重做' : '重试'}
          </Button>
          :
          <Button variant="default" disabled={status !== 'Ready'} onClick={handleStart}>
            开始
          </Button>
        }
      </div>
    </div>

  )
}

export default ImageTransfer