import React from 'react'
import Image from 'next/image'
import { twMerge } from 'tailwind-merge'
import { Button } from '@/components/ui/button'
import ImageCompare from './image-compare'

interface PropsData {
  src: string
  setSrc: (src: string) => void
  result: string
  setResult: (result: string) => void
  status: string
  setStatus: (status: 'Ready' | 'Pending' | 'Done' | 'Finish') => void
  onGenerateImage: (action: any) => Promise<any>
}

function ToolRemoveBg({ src, status, setStatus, result, setResult, onGenerateImage }: PropsData) {

  const handleStart = async () => {
    const action = {
      type: 'remove-bg',
      src: src,
    }
    setStatus('Pending')
    const res = await onGenerateImage(action)
    if (res && res.imageSrc) {
      setResult(res.imageSrc)
    }
    setStatus('Done')
  }

  const handleStop = async () => {
    setStatus('Finish')
  }

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

export default ToolRemoveBg