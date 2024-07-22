import React from 'react'
import { Input } from "@/components/ui/input"

interface PromptBarProps {
  payload: any
  setPayload: (data: any) => void
}

function PromptBar({ payload, setPayload }: PromptBarProps) {

  const handleInputChange = ({ target }: any) => {
    console.log('ddd:::', target.value)
    setPayload((preData: any) => { return { ...preData, prompt: target.value } });
  }

  return (
    <div className='w-full flex justify-center'>
      <Input value={payload.prompt} type="text" placeholder="请输入图片修改要求" onChange={handleInputChange} />
    </div>
  )
}

export default PromptBar