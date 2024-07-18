import React from 'react'
import Image from 'next/image'
import { twMerge } from 'tailwind-merge'
import { Button } from '@/components/ui/button'
import ImageCompare from './image-compare'
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

  const handleStart = async () => {
    const action = {
      name: tool.name,
      src: src,
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

  return (
    <div id="tool-remove-bg" className="w-full space-y-4">
      <div className="w-0 h-0"></div>
      <div className="show rounded-xl overflow-hidden mosaic-bg relative">
        <Image width={200} height={200} alt="image" src={src} className={twMerge('w-full', result ? 'opacity-0' : '')}></Image>
        {
          status === 'Pending' && <div className={twMerge('scan w-full absolute top-0 transition-all duration-200 pointer-events-none',)}>
          </div>
        }
        {
          result && <div className='w-full absolute top-0'>
            <ImageCompare
              beforeSrc={src}
              afterSrc={result}
              initPosition={30}
            />
          </div>
        }
      </div>

      <div className="action flex justify-between">
        <Button variant="outline" className='border-primary text-primary' onClick={handleStop}>退出</Button>
        <Button variant="default" disabled={status !== 'Ready'} onClick={handleStart}>开始</Button>
      </div>
    </div>

  )
}

export default ImageTransfer