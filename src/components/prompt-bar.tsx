import React from 'react'
import { Input } from "@/components/ui/input"

interface PromptBarProps {
  payload: any
  setPayload: (data: any) => void
  placeHolder?: string
}

function PromptBar({ payload, setPayload, placeHolder }: PromptBarProps) {

  const handleInputChange = ({ target }: any) => {
    setPayload((preData: any) => { return { ...preData, prompt: target.value } });
  }

  return (
    <div className='w-full flex justify-center'>
      <Input
        value={payload.prompt}
        type="text"
        placeholder={placeHolder ? placeHolder : '请输入图片修改要求'}
        onChange={handleInputChange}
      />
    </div>
  )
}

export default PromptBar