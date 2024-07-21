import React from 'react'
import Image from 'next/image'
import { twMerge } from 'tailwind-merge'
import { Button } from '@/components/ui/button'
import ImageCompare from './image-compare'
import ScaleBar from './scale-bar'
import UploadBar from './upload-bar'
import PromptBar from './prompt-bar'
import { updateTask } from '@/app/photoshow/query'
import { Tool } from '@/types'
import ImageManager from '@/utils/Image'

interface PropsData {
  tool: Tool
  setTool: (tool: Tool) => void
  src: string
  setSrc: (src: string) => void
  result: string
  setResult: (result: string) => void
  status: string
  setStatus: (status: 'Ready' | 'Pending' | 'Done' | 'Finish') => void
  onGenerateImage: (action: any) => Promise<any>
}

function ImageTransfer({ tool, src, setSrc, status, setStatus, result, setResult, onGenerateImage }: PropsData) {
  // upscale
  const [scale, setScale] = React.useState('2')
  // prompt
  const [prompt, setPrompt] = React.useState('')
  // swap-face
  const [mask, setMask] = React.useState<File | null>(null)

  const handleStart = async () => {
    const action = {
      name: tool.name,
      src,
      scale,
      mask,
      prompt,
    }
    setStatus('Pending')
    const res = await onGenerateImage(action)
    if (res && res.imageSrc) {
      setResult(res.imageSrc)
      setStatus('Done')
    } else {
      handleReset()
    }
  }

  const handleReStart = async () => {
    setResult('')
    handleStart()
  }

  const handleStop = async () => {
    updateTask({})
    setStatus('Finish')
  }

  const handleReset = async () => {
    if (result) {
      const localSrc = await ImageManager.localizeImage(result) as string
      setSrc(localSrc)
      setResult('')
    }
    setStatus('Ready')
    updateTask({})
  }

  React.useEffect(() => {
    console.log('tool::', tool)
    handleReset()
  }, [tool])

  // debug
  // React.useEffect(() => {
  //   console.log('mask::', mask)
  // }, [mask])

  return (
    <div id="image-transfer" className="w-full h-full space-y-4 flex flex-col">
      {/* 占位区 */}
      <div className="w-full h-0"></div>

      {/* 展示区 */}
      <div className="show w-full grow flex flex-col justify-center items-center space-y-4">

        <div className="w-full rounded-xl overflow-hidden mosaic-bg relative">
          <Image width={200} height={200} alt="image" src={src} className={
            twMerge('w-full h-auto m-auto', result ? 'opacity-0' : '')}
          >
          </Image>

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

        <div className="w-full justify-center items-center">
          {status === 'Ready' &&
            <div className="w-full">
              {tool.name === 'upscale' &&
                <ScaleBar scale={scale} setScale={setScale} />
              }
              {tool.name === 'swap-face' &&
                <UploadBar mask={mask} setMask={setMask} />
              }
              {tool.name === 'recreate-img' &&
                <PromptBar prompt={prompt} setPrompt={setPrompt} />
              }
              {tool.name === 'inpaint-img' &&
                <PromptBar prompt={prompt} setPrompt={setPrompt} />
              }
            </div>
          }
          {status === 'Pending' &&
            <div className='text-center text-sm text-violet-500'>
              图片生成中，请耐心等待1-5分钟~
            </div>
          }
          {status === 'Done' &&
            <div className='text-center text-sm text-violet-500'>
              图片已经生成，可点击右上角按钮快速保存！
            </div>
          }
        </div>

      </div>


      {/* 操作区 */}
      <div className="action flex justify-between space-x-4">
        <Button variant="outline" className='border-primary text-primary' onClick={handleStop}>
          退出
        </Button>

        {status === 'Done'
          ?
          <Button variant="default" onClick={handleReStart}>
            重试
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