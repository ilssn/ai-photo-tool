import React, { useState, useEffect, useRef } from 'react'
import { CropperRef, Cropper, ImageRestriction } from 'react-advanced-cropper'
import { twMerge } from 'tailwind-merge'
// import { downloadImage } from '@/utils/image-tool'
// import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch'
import { parse } from 'path'
// import SvgIcon from './SvgIcon'
import 'react-advanced-cropper/dist/style.css'
// import 'react-advanced-cropper/dist/themes/compact.css'
// import 'react-advanced-cropper/dist/themes/corners.css'
import { Input } from "@/components/ui/input"

export function canvasToBlob(
  canvas: HTMLCanvasElement,
  type = 'image/png' as 'image/jpeg' | 'image/png',
  quality?: number
): Promise<Blob | null> {
  return new Promise((res) => {
    canvas.toBlob((blob) => res(blob), type, quality)
  })
}



export function downloadImage(uri: string, name: string) {
  const link = document.createElement('a')
  link.href = uri
  link.download = name

  link.dispatchEvent(
    new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
      view: window,
    })
  )

  setTimeout(() => {
    link.remove()
  }, 100)
}

type BoundingBox = {
  top: number
  left: number
  width: number
  height: number
}

type Params = {
  file: File
  left: string
  right: string
  up: string
  down: string
}

type Result = {
  base64: string
}

interface PropsData {
  src: string
  setSrc: (src: string) => void
  setPayload: (data: any) => void
}

const ImageUncropper: React.FC<PropsData> = ({ src, setSrc, setPayload }) => {
  const cropperRef = useRef<CropperRef>(null)
  const [pixel, setPixel] = useState<BoundingBox | null>(null)
  // const [src, setSrc] = useState<string | undefined>(undefined)
  const [image, setImage] = useState<HTMLImageElement | null>(null)
  const [processing, setProcessing] = useState(false)
  const [finish, setFinish] = useState(false)

  // init
  useEffect(() => {
    if (!src) return
    // const newSrc = URL.createObjectURL(file)
    // setSrc(newSrc)
    const img = new Image()
    img.src = src
    img.onload = () => setImage(img)
    // set width
    // const offeset = window.innerWidth > 1024 ? 282 + 16 : 32 + 16
    // const containerWidth = window.innerWidth - offeset
  }, [src])


  // React.useEffect(() => {
  //   if (cropperRef.current) {
  //     cropperRef.current!.reset();
  //   }
  // }, [src]);

  if (!image) return null

  const onChange = (cropper: CropperRef) => {
    if (cropperRef.current) {
      const data = cropper.getCoordinates()
      setPixel(data)
    }
  }

  const onResetWidth = async (e: any) => {
    const currentWidth = e.target.value
    if (currentWidth !== '' && !/^[0-9]+$/.test(currentWidth)) {
      return
    }
    if (currentWidth > 5000) return
    const newPixel = JSON.parse(JSON.stringify(pixel))
    newPixel.width = currentWidth
    setPixel(newPixel)
    if (currentWidth < 100) return
    if (cropperRef.current) {
      cropperRef.current.setCoordinates(newPixel)
    }
    const position = getPosition(newPixel)
    const mask = await getMaskFile()
    setPayload((preData: any) => { return { ...preData, position, mask } });
  }

  const onResetHeight = async (e: any) => {
    const currentHeight = e.target.value
    if (currentHeight !== '' && !/^[0-9]+$/.test(currentHeight)) {
      return
    }
    if (currentHeight > 5000) return
    const newPixel = JSON.parse(JSON.stringify(pixel))
    newPixel.height = currentHeight
    setPixel(newPixel)
    if (currentHeight < 100) return
    if (cropperRef.current) {
      cropperRef.current.setCoordinates(newPixel)
    }
    const position = getPosition(newPixel)
    const mask = await getMaskFile()
    setPayload((preData: any) => { return { ...preData, position, mask } });
  }

  // const onReset = () => {
  //   setSrc(undefined)
  //   setFile(undefined)
  // }

  const getPosition = (pixel: any) => {
    let left = pixel.left
    let right = image.width - pixel.width - left
    let up = pixel.top
    let down = image.height - pixel.height - up

    const position = {
      left: left < 0 ? (left * -1) : 0,
      right: right < 0 ? (right * -1) : 0,
      up: up < 0 ? (up * -1) : 0,
      down: down < 0 ? (down * -1) : 0,
    }

    return position
    // setProcessing(true)
  }

  const loadImage = (url: string) => {
    const img = new Image()
    img.src = url
  }

  const resetSize = async (pixel: any, originCanvas: any) => {
    return new Promise((resolve) => {
      const position = getPosition(pixel)
      const { left, right, up, down } = position;

      const originUrl = originCanvas.toDataURL('image/png')
      const originImage = new Image()

      originImage.onload = () => {
        const newCanvas = document.createElement('canvas')
        const newContext = newCanvas.getContext('2d')
        if (newContext && originImage) {
          newCanvas.width = Number(originImage.width) - left - right
          newCanvas.height = Number(originImage.height) - up - down

          newContext.drawImage(
            originCanvas,
            left, // 开始裁切的 x 坐标
            up, // 开始裁切的 y 坐标
            newCanvas.width, // 裁切的宽度
            newCanvas.height, // 裁切的高度

            0, // 在目标 canvas 开始绘制的 x 坐标
            0, // 在目标 canvas 开始绘制的 y 坐标
            newCanvas.width, // 在目标 canvas 上绘制的宽度
            newCanvas.height // 在目标 canvas 上绘制的高度
          )
          // loadImage(newCanvas.toDataURL('image/png'))
          resolve(newCanvas)
        }
      }
      originImage.src = originUrl
    })
  }

  const getMaskFile = async () => {
    const current = cropperRef.current as HTMLCanvasElement | null
    if (current) {
      const maskCanvas = (await resetSize(pixel, cropperRef.current?.getCanvas())) as HTMLCanvasElement
      const maskBlob = await canvasToBlob(maskCanvas)
      if (!maskBlob) return null
      const maskFile = new File([maskBlob], 'mask.png', {
        type: 'image/png',
      })
      // debug
      // const maskUrl = maskCanvas.toDataURL()
      // downloadImage(maskUrl, 'testddd.png')
      return maskFile
    }
  }

  const onDownload = () => {
    // if (!src) {
    //   return
    // }
    // let resultName = 'result.png'
    // let imageType = 'png'
    // if (file?.name && file.name.split('.').length) {
    //   imageType = file.name.split('.')[1]
    // }
    // if (file?.name) {
    //   const { name } = parse(file.name)
    //   resultName = `${name}-uncrop.${imageType}`
    // }
    downloadImage(src, 'test.png')
  }

  const handleActionDone = async () => {
    if (cropperRef.current) {
      // setPayload((preData: any) => { return { ...preData, canvas: cropperRef.current!.getCanvas() } });
      const position = getPosition(pixel)
      const mask = await getMaskFile()
      setPayload((preData: any) => { return { ...preData, position, mask } });
    }
  }

  return (
    <div
      className="image-cropper flex w-full flex-col"
      onMouseUp={() => handleActionDone()}
      onTouchEnd={() => handleActionDone()}
    >
      <div className="tools flex w-full justify-center absolute top-[100%]">
        <div className="justiry-start flex w-full space-x-2 py-2 justify-center">
          <label className="input input-sm md:input-md input-bordered flex items-center">
            <Input
              value={pixel?.width || ''}
              type="number"
              className="w-[80px] h-8"
              placeholder="宽度" onChange={onResetWidth}
            />
          </label>
          <span className='flex items-center text-center text-slate-300 '>-</span>
          <label className=" input input-sm md:input-md input-bordered flex items-center">
            <Input
              value={pixel?.height || ''}
              type="number"
              className="w-[80px] h-8"
              placeholder="高度"
              onChange={onResetHeight}
            />
          </label>
        </div>
      </div>

      <div
        className="show w-full relative">
        <img className="w-full h-auto rounded-xl opacity-0" src={src} alt="Mask Background" />
        <div className='absolute top-0 left-0 w-full h-full'>
          <Cropper
            className={twMerge(
              'mosaic-bg !text-primary rounded-xl'
            )}
            ref={cropperRef}
            src={src}
            onChange={onChange}
            imageRestriction={ImageRestriction.none}
            defaultVisibleArea={{
              left: -200,
              top: -200,
              width: image.width + 400,
              height: image.height + 400,
            }}
            defaultCoordinates={{
              left: 0,
              top: 0,
              width: image.width,
              height: image.height,
            }}
            stencilProps={{
              grid: true,
            }}
          />
        </div>


      </div>

      {/* <div className="actions mb-2 flex w-full justify-between">
        <button className="btn" onClick={onReset}>
          Back
        </button>
        <button
          className={twMerge(
            'btn btn-primary',
            processing ? 'btn-disabled' : '',
            finish ? 'hidden' : ''
          )}
          onClick={onGenerate}
        >
          Generate
        </button>
        <button
          className={twMerge('btn btn-primary', finish ? '' : 'hidden')}
          onClick={onDownload}
        >
          Download
        </button>
      </div> */}
    </div>
  )
}

export default ImageUncropper
