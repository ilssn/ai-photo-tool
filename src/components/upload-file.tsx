"use client"

import React from 'react'
import { twMerge } from 'tailwind-merge'
import DropZone from './drop-zone'
import { RiUpload2Line } from "react-icons/ri";

const ALLOWED_FILES = ['image/png', 'image/jpeg', 'image/webp'];

interface UplodFileProps {
  setFile?: (file: File | null) => void
}

function UploadFile({setFile }: UplodFileProps) {
  const [dragging, setDragging] = React.useState(false)
  const handleDragging = React.useCallback((dragging: boolean) => {
    setDragging(dragging)
  }, [])
  const fileRef = React.useRef<HTMLInputElement | null>(null)

  // 选中产品图
  const handleFileSelect = React.useCallback(async (files: FileList | Array<File>) => {
    const file = Array.from(files).filter((file) =>
      ALLOWED_FILES.includes(file.type)
    )[0]

    if (file) {
      console.log('file::', file)
      if(setFile) {
        setFile(file)
      }
    }

    if (fileRef.current) {
      fileRef.current.value = ''
    }
  }, [])


  return (
    <div id="upload-file" className="bg-primary opacity-60 hover:opacity-40 overflow-hidden rounded-3xl p-4 w-full">
      <DropZone
        onDrop={(files: any) => handleFileSelect(files)}
        onDrag={handleDragging}
      >
        <div
          className='flex rounded-2xl flex-col items-center justify-center border-4 border-dashed border-gray-100 px-4 py-2 text-center sm:py-2 cursor-pointer'
          onClick={() => fileRef.current?.click()}
        >
          <RiUpload2Line className='text-5xl text-bold text-white' style={{ color: 'white' }} />
          <p className="text-sm text-white mx-16 text-center font-bold opacity-100">
            点击或拖拽上传
          </p>
          <input
            type="file"
            ref={fileRef}
            className={twMerge(
              'absolute bottom-0 left-0 right-0 top-0',
              'hidden'
            )}
            accept={ALLOWED_FILES.join(',')}
            onChange={(ev) =>
              handleFileSelect(ev.currentTarget.files ?? [])
            }
          />
        </div>
      </DropZone>
    </div>
  )
}

export default UploadFile