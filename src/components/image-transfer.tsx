import React from 'react'
import NextImage from 'next/image'
import { twMerge } from 'tailwind-merge'
import { Button } from '@/components/ui/button'
import ImageCompare from './image-compare'
import ImageCropper from './image-cropper'
import ScaleBar from './scale-bar'
import UploadBar from './upload-bar'
import PromptBar from './prompt-bar'
import DescriptBar from './descript-bar'
import LightBar from './light-bar'
import AlertBar from './alert-bar'
import { DescriptModal } from './descript-modal'
import { ConfirmModal } from './confirm-modal'
import { updTask } from '@/app/photoshow/query'
import { Tool, Status } from '@/types'
import { PHOTO_DEFAULT_PAYLOAD } from '@/constants'
import ImageManager from '@/utils/Image'
import { ImageEditor } from './image-editor'
import ImageUncropper from './Image-uncropper'
import MediaBar from './media-bar'
import VideoPlayer from './video-player'

// use dynamic import to fixed the canvas require error on next14
import dynamic from 'next/dynamic'
const ImageMask = dynamic(() => import('./Image-mask'), {
  ssr: false,
})

interface PropsData {
  file: File | null
  tool: Tool
  onGenerateImage: (action: any) => Promise<any>
  onGenerateVideo: (action: any) => Promise<any>
  src: string
  setSrc: (src: string) => void
  status: string
  setStatus: (status: Status) => void
  result: string
  setResult: (result: string) => void
}

function ImageTransfer({ file, tool, onGenerateImage, onGenerateVideo, src, setSrc, status, setStatus, result, setResult, }: PropsData) {
  const [maxWidth, setMaxWidth] = React.useState('1200px')
  const [errorInfo, setErrorInfo] = React.useState<any>(null)
  const [payload, setPayload] = React.useState<any>(PHOTO_DEFAULT_PAYLOAD)
  const [originSrc, setOriginSrc] = React.useState('')
  const [videoSrc, setVideoSrc] = React.useState('')
  const [media, setMedia] = React.useState('image')
  const [isReady, setIsReady] = React.useState(true)
  // const [actionType, setAtionType] = React.us

  // 生成视频
  const handleCreateVideo = async () => {
    try {
      if (!result) return
      setVideoSrc('')
      setMedia('video')
      // return
      setTimeout(async () => {
        setStatus('Pending')
        const res = await onGenerateVideo({ type: tool.name, payload, })
        // 设置媒体
        setMedia('video')
        // 设置结果
        setVideoSrc(res.video)
        // 设置状态
        setStatus('Done')

      }, 100)
    } catch (error) {
      setMedia('image')
      setErrorInfo(error)
      setStatus('Error')
    }
  }

  // 开始任务
  const handleStart = async () => {
    try {
      // 设置媒体
      setMedia('image')
      // 设置状态
      setStatus('Pending')
      const res = await onGenerateImage({ type: tool.name, payload, })
      // 缓存原图
      setOriginSrc(src)
      // 高阶图片容器缓存原图，因为图片尺寸有变化
      if (['crop-img', 'uncrop', 'filter-img'].includes(tool.name)) {
        setSrc(res.imageSrc)
      }
      // 重置视频
      setVideoSrc('')
      // 设置结果
      setResult(res.imageSrc)
      // 设置状态
      setStatus('Done')
    } catch (error) {
      setErrorInfo(error)
      setStatus('Error')
    }
  }

  // 重试任务
  const handleRestart = async () => {
    // 设置媒体
    setMedia('image')
    // 重置视频
    setVideoSrc('')
    // 恢复原图
    setSrc(originSrc)
    setResult('')
    if (['crop-img', 'uncrop', 'filter-img', 'remove-obj', 'inpaint-img'].includes(tool.name)) {
      setStatus('Ready')
    } else {
      handleStart()
    }
  }

  // 继续任务
  const handleContinue = async () => {
    // 设置媒体
    setMedia('image')
    // 清空视频
    setVideoSrc('')
    //
    if (result) {
      const localSrc = await ImageManager.localizeImage(result) as string
      setSrc(localSrc)
      setResult('')
    }
    setStatus('Ready')
    setPayload(PHOTO_DEFAULT_PAYLOAD)
    updTask({})
  }

  // 重置状态
  const handleReset = async () => {
    setResult('')
    setStatus('Ready')
    setPayload(PHOTO_DEFAULT_PAYLOAD)
    updTask({})
  }

  // 退出编辑
  const handleStop = async () => {
    updTask({})
    setStatus('Finish')
  }

  // 文件变化, 重置状态
  React.useEffect(() => {
    if (file) {
      handleReset()
    }
  }, [file])

  // 工具变化, 继续任务
  React.useEffect(() => {
    handleContinue()
  }, [tool])

  // 原图变化，重设容器尺寸
  React.useEffect(() => {
    setMaxWidth('10px')
    const img = new Image()
    img.src = src
    img.onload = () => {
      if (img.width && img.height) {
        const scale = Number(img.height) / Number(img.width)
        if (scale > 1.8) {
          setMaxWidth('300px')
        }
        if (scale > 1.6) {
          setMaxWidth('400px')
        }
        else if (scale > 1.5) {
          setMaxWidth('500px')
        }
        else if (scale > 1.3) {
          setMaxWidth('600px')
        }
        else if (scale > 1) {
          setMaxWidth('700px')
        } else {
          setMaxWidth('1200px')
        }
      }
    }
    img.onerror = () => {
      console.log('Load image error')
    }
  }, [src])

  // 结果图变化，重设容器尺寸
  React.useEffect(() => {
    if (!result) return
    setMaxWidth('10px')
    const img = new Image()
    img.src = result
    img.onload = () => {
      if (img.width && img.height) {
        const scale = Number(img.height) / Number(img.width)
        if (scale > 1.8) {
          setMaxWidth('300px')
        }
        if (scale > 1.6) {
          setMaxWidth('400px')
        }
        else if (scale > 1.5) {
          setMaxWidth('500px')
        }
        else if (scale > 1.3) {
          setMaxWidth('600px')
        }
        else if (scale > 1) {
          setMaxWidth('700px')
        } else {
          setMaxWidth('1200px')
        }
      }
    }
    img.onerror = () => {
      console.log('Load image error')
    }
  }, [result])

  // 参数变化，校验数据
  React.useEffect(() => {
    setIsReady(true)
    if (tool.name === 'remove-obj') {
      if (!payload.mask) {
        setIsReady(false)
      }
    }
    if (tool.name === 'replace-bg') {
      if (!payload.prompt) {
        setIsReady(false)
      }
    }
    if (tool.name === 'swap-face') {
      if (!payload.mask) {
        setIsReady(false)
      }
    }
    if (tool.name === 'uncrop') {
      if (!payload.mask) {
        setIsReady(false)
      }
    }
    if (tool.name === 'inpaint-img') {
      if (!payload.prompt) {
        setIsReady(false)
      }
      if (!payload.mask) {
        setIsReady(false)
      }
    }
    if (tool.name === 'recreate-img') {
      if (!payload.prompt) {
        setIsReady(false)
      }
    }
    if (tool.name === 'sketch-img') {
      if (!payload.prompt) {
        setIsReady(false)
      }
    }

  }, [tool, payload])

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
        <div
          // className={twMerge("w-full rounded-xl overflow-hidden transition-all duration-200",
          className={twMerge("w-full rounded-xl overflow-hidden space-y-2 ",
            ['inpaint-img', 'remove-obj', 'uncrop'].includes(tool.name) ? 'pb-12' : ''
          )}
          style={{ maxWidth: maxWidth }}
        >
          {/* 展示媒体类型 */}
          {videoSrc &&
            <MediaBar media={media} setMedia={setMedia} />
          }
          {/* 基础通用图片容器 */}
          {!['crop-img', 'uncrop', 'filter-img', 'remove-obj', 'inpaint-img'].includes(tool.name) &&
            <div className={twMerge("w-full relative rounded-xl", media === 'image' ? 'mosaic-bg' : '')}>
              {media === 'image' &&
                <img width={200} height={200} alt="image" src={src}
                  className={twMerge('w-full h-auto m-auto', result ? 'opacity-0' : '')}
                >
                </img>
              }
              {media === 'video' &&
                <img width={200} height={200} alt="image" src={result}
                  className={twMerge('w-full h-auto m-auto', status !== 'Pending' ? 'opacity-0' : '')}
                >
                </img>
              }


              {result && media === 'image' &&
                <div className='w-full absolute top-0 '>
                  <ImageCompare
                    beforeSrc={src}
                    afterSrc={result}
                    initPosition={30}
                  />
                </div>
              }

              {videoSrc && media === 'video' &&
                <div className='w-full absolute bottom-0 rounded-xl overflow-hidden  ' style={{ background: 'rgb(245, 245, 245, 0.6)' }}>
                  <VideoPlayer
                    url={videoSrc}
                    width="100%"
                    height="100%"
                  />
                </div>
              }

              {status === 'Pending' &&
                <div className={twMerge('scan w-full absolute top-0 transition-all duration-200 pointer-events-none',)}>
                </div>
              }
            </div>
          }

          {/* 高级定制图片容器1a, 尺寸改变 */}
          {['crop-img'].includes(tool.name) &&
            <div className={twMerge("w-full relative rounded-xl", media === 'image' ? 'mosaic-bg' : '')}>
              {media === 'image' &&
                <img width={200} height={200} alt="image" src={src}
                  className={twMerge('w-full h-auto m-auto rounded-xl opacity-0')}
                >
                </img>
              }
              {media === 'video' &&
                <img width={200} height={200} alt="image" src={result}
                  className={twMerge('w-full h-auto m-auto rounded-xl', status !== 'Pending' ? 'opacity-0' : '')}
                >
                </img>
              }


              {media === 'image' &&
                <div className={twMerge("absolute top-0 left-0 w-full h-full", result ? 'opacity-0' : '')}>
                  <ImageCropper src={src} setSrc={setSrc} setPayload={setPayload} />
                </div>
              }

              {result && media === 'image' &&
                <div className='w-full absolute top-0'>
                  <img width={200} height={200} alt="image" src={result} className={
                    twMerge('w-full h-auto m-auto, rounded-xl')}
                  >
                  </img>
                </div>
              }

              {videoSrc && media === 'video' &&
                <div className='w-full absolute bottom-0 rounded-xl overflow-hidden ' style={{ background: 'rgb(245, 245, 245, 0.6)' }}>
                  <VideoPlayer
                    url={videoSrc}
                    width="100%"
                    height="100%"
                  />
                </div>
              }

              {status === 'Pending' &&
                <div className={twMerge('scan w-full absolute top-0 transition-all duration-200 pointer-events-none',)}>
                </div>
              }

            </div>
          }


          {/* 高级定制图片容器1b, 尺寸改变 */}
          {['uncrop'].includes(tool.name) &&
            <div className={twMerge("w-full relative rounded-xl", media === 'image' ? 'mosaic-bg' : '')}>
              {media === 'image' &&
                <img width={200} height={200} alt="image" src={src}
                  className={twMerge('w-full h-auto m-auto rounded-xl opacity-0')}
                >
                </img>
              }
              {media === 'video' &&
                <img width={200} height={200} alt="image" src={result}
                  className={twMerge('w-full h-auto m-auto rounded-xl', status !== 'Pending' ? 'opacity-0' : '')}
                >
                </img>
              }

              {media === 'image' &&
                <div className={twMerge("absolute top-0 left-0 w-full h-full", result ? 'opacity-0' : '')}>
                  <ImageUncropper src={src} setSrc={setSrc} setPayload={setPayload} />
                </div>
              }

              {result && media === 'image' &&
                <div className='w-full absolute top-0'>
                  <img width={200} height={200} alt="image" src={result} className={
                    twMerge('w-full h-auto m-auto, rounded-xl')}
                  >
                  </img>
                </div>
              }

              {videoSrc && media === 'video' &&
                <div className='w-full absolute bottom-0 rounded-xl overflow-hidden  ' style={{ background: 'rgb(245, 245, 245, 0.6)' }}>
                  <VideoPlayer
                    url={videoSrc}
                    width="100%"
                    height="100%"
                  />
                </div>
              }

              {status === 'Pending' &&
                <div className={twMerge('scan w-full absolute top-0 transition-all duration-200 pointer-events-none',)}>
                </div>
              }

            </div>
          }


          {/* 高级定制图片容器2, 尺寸改变 */}
          {['filter-img'].includes(tool.name) &&
            <div className={twMerge("w-full relative rounded-xl", media === 'image' ? 'mosaic-bg' : '')}>
              {media === 'image' &&
                <img width={200} height={200} alt="image" src={src}
                  className={twMerge('w-full h-auto m-auto rounded-xl opacity-0')}
                >
                </img>
              }
              {media === 'video' &&
                <img width={200} height={200} alt="image" src={result}
                  className={twMerge('w-full h-auto m-auto rounded-xl', status !== 'Pending' ? 'opacity-0' : '')}
                >
                </img>
              }

              {media === 'image' &&
                <div className={twMerge("absolute top-0 left-0 w-full h-full", result ? 'opacity-0' : '')}>
                  <ImageEditor src={src} setSrc={setSrc} setPayload={setPayload} />
                </div>
              }


              {result && media === 'image' &&
                <div className='w-full absolute top-0'>
                  <img width={200} height={200} alt="image" src={result} className={
                    twMerge('w-full h-auto m-auto, rounded-xl')}
                  >
                  </img>
                </div>
              }

              {videoSrc && media === 'video' &&
                <div className='w-full absolute bottom-0 rounded-xl overflow-hidden  ' style={{ background: 'rgb(245, 245, 245, 0.6)' }}>
                  <VideoPlayer
                    url={videoSrc}
                    width="100%"
                    height="100%"
                  />
                </div>
              }

              {status === 'Pending' &&
                <div className={twMerge('scan w-full absolute top-0 transition-all duration-200 pointer-events-none',)}>
                </div>
              }

            </div>
          }

          {/* 高级定制图片容器3: 涂抹操作 */}
          {['remove-obj'].includes(tool.name) &&
            <div className={twMerge("w-full relative rounded-xl", media === 'image' ? 'mosaic-bg' : '')}>
              {media === 'image' &&
                <img width={200} height={200} alt="image" src={src}
                  className={twMerge('w-full h-auto m-auto rounded-xl opacity-0')}
                >
                </img>
              }
              {media === 'video' &&
                <img width={200} height={200} alt="image" src={result}
                  className={twMerge('w-full h-auto m-auto rounded-xl', status !== 'Pending' ? 'opacity-0' : '')}
                >
                </img>
              }

              {media === 'image' && !result &&
                <div className={twMerge("absolute top-0 left-0 w-full h-full", result ? 'opacity-0' : '')}>
                  <ImageMask src={src} setSrc={setSrc} setPayload={setPayload} />
                </div>
              }

              {result && media === 'image' &&
                <div className='w-full absolute top-0'>
                  <ImageCompare
                    beforeSrc={src}
                    afterSrc={result}
                    initPosition={30}
                  />
                </div>
              }

              {videoSrc && media === 'video' &&
                <div className='w-full absolute bottom-0 rounded-xl overflow-hidden  ' style={{ background: 'rgb(245, 245, 245, 0.6)' }}>
                  <VideoPlayer
                    url={videoSrc}
                    width="100%"
                    height="100%"
                  />
                </div>
              }

              {status === 'Pending' &&
                <div className={twMerge('scan w-full absolute top-0 transition-all duration-200 pointer-events-none',)}>
                </div>
              }

            </div>
          }

          {/* 高级定制图片容器4: 修改操作 */}
          {['inpaint-img'].includes(tool.name) &&
            <div className={twMerge("w-full relative rounded-xl", media === 'image' ? 'mosaic-bg' : '')}>
              {media === 'image' &&
                <img width={200} height={200} alt="image" src={src}
                  className={twMerge('w-full h-auto m-auto rounded-xl opacity-0')}
                >
                </img>
              }
              {media === 'video' &&
                <img width={200} height={200} alt="image" src={result}
                  className={twMerge('w-full h-auto m-auto rounded-xl', status !== 'Pending' ? 'opacity-0' : '')}
                >
                </img>
              }

              {media === 'image' && !result &&
                <div className={twMerge("absolute top-0 left-0 w-full h-full", result ? 'opacity-0' : '')}>
                  <ImageMask src={src} setSrc={setSrc} setPayload={setPayload} />
                </div>
              }

              {result && media === 'image' &&
                <div className='w-full absolute top-0'>
                  <ImageCompare
                    beforeSrc={src}
                    afterSrc={result}
                    initPosition={30}
                  />
                </div>
              }

              {videoSrc && media === 'video' &&
                <div className='w-full absolute bottom-0 rounded-xl overflow-hidden ' style={{ background: 'rgb(245, 245, 245, 0.6)' }}>
                  <VideoPlayer
                    url={videoSrc}
                    width="100%"
                    height="100%"
                  />
                </div>
              }

              {status === 'Pending' &&
                <div className={twMerge('scan w-full absolute top-0 transition-all duration-200 pointer-events-none',)}>
                </div>
              }

            </div>
          }


        </div>

        {/* 状态参数 */}
        <div className="w-full justify-center items-center">
          {status === 'Pending' &&
            <div className='text-center text-sm text-violet-500'>
              <p>
                {media === 'image' ? '图片生成中，请耐心等待1-5分钟~' : '视频生成中，请耐心等待3-10分钟～'}
              </p>
            </div>
          }

          {status !== 'Pending' &&
            <div className="w-full">
              {tool.name === 'upscale' &&
                <ScaleBar payload={payload} setPayload={setPayload} />
              }
              {tool.name === 'super-upscale' &&
                <div className="w-full flex flex-col space-y-2">
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
                <div className="w-full flex flex-col space-y-2">
                  <LightBar payload={payload} setPayload={setPayload} />
                  <PromptBar
                    payload={payload}
                    setPayload={setPayload}
                    placeHolder="请输入背景图描述"
                  />
                </div>
              }
              {/* {result &&
              <div className="w-full mt-2">
                <DescriptBar payload={payload} setPayload={setPayload} />
              </div>
              } */}
            </div>
          }
        </div>

      </div>


      {/* 操作区 */}
      <div className="w-full h-12 md:hidden"></div>
      <div className="action flex justify-between space-x-4 fixed left-0 bottom-12 w-full px-4 pt-2 bg-background/95 md:static md:p-0">
        {/* <Button variant="outline" className='border-primary text-primary' onClick={handleStop}>
          退出
        </Button> */}
        <ConfirmModal confirm={handleStop} />

        <div className="flex-1 flex items-center justify-center space-x-2">
          {tool.name === 'remove-obj' && result &&
            <Button variant="default" onClick={handleContinue}>继续消除</Button>
          }
          {tool.name === 'uncrop' && result &&
            <Button variant="default" onClick={handleContinue}>继续拓展</Button>
          }

          {/* {result && !videoSrc &&
            <DescriptModal title="生成视频" status={status} payload={payload} setPayload={setPayload} confirm={handleCreateVideo} />
          }
          {result && videoSrc &&
            <DescriptModal title="重新生成视频" status={status} payload={payload} setPayload={setPayload} confirm={handleCreateVideo} />
          } */}

        </div>


        {result || status === 'Error'
          ?
          <Button variant="default" onClick={handleRestart}>
            {['crop-img', 'uncrop', 'filter-img', 'remove-obj', 'inpaint-img'].includes(tool.name) ? '重做' : '重试'}
          </Button>
          :
          <Button variant="default" disabled={status !== 'Ready' || !isReady || media === 'video'} onClick={handleStart}>
            {['crop-img', 'filter-img',].includes(tool.name) ? '保存' : '开始'}
          </Button>
        }
      </div>
    </div>

  )
}

export default ImageTransfer