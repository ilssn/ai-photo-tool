import React from 'react'
import { Input } from "@/components/ui/input"

interface PromptBarProps {
  prompt: string
  setPrompt: (prompt: string) => void
}

function PromptBar({ prompt, setPrompt }: PromptBarProps) {

  const handleInputChange = ({ target }: any) => {
    setPrompt(target.value)
  }

  return (
    <div className='w-full flex justify-center'>
      <Input type="text" placeholder="请输入图片修改要求" onChange={handleInputChange} />
    </div>
  )
}

export default PromptBar