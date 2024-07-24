import React from 'react'
import { Button } from './ui/button'
import { RiUpload2Fill } from "react-icons/ri";

const ALLOWED_FILES = ['image/png', 'image/jpeg', 'image/webp'];

interface UplodaButtonProps {
  setFile: (file: File | null) => void
  setResult?: (result: string) => void
}

function UploadButton({ setFile, setResult }: UplodaButtonProps) {
  const fileRef = React.useRef<HTMLInputElement | null>(null)

  // 选中
  const handleFileSelect = React.useCallback(async (files: FileList | Array<File>) => {
    const file = Array.from(files).filter((file) =>
      ALLOWED_FILES.includes(file.type)
    )[0]

    if (file) {
      setResult && setResult('')
      setTimeout(() => {
        setFile(file)
      }, 30)
    }

    if (fileRef.current) {
      fileRef.current.value = ''
    }
  }, [])


  return (
    <div className='w-full flex justify-center'>
      <Button className='w-full' onClick={() => fileRef.current?.click()}>
        <RiUpload2Fill />
        上传新的图片
      </Button>

      <input
        className='hidden'
        type="file"
        ref={fileRef}
        accept={ALLOWED_FILES.join(',')}
        onChange={(ev) =>
          handleFileSelect(ev.currentTarget.files ?? [])
        }
      />
    </div>
  )
}

export default UploadButton