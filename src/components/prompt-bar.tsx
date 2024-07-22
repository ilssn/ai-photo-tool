import React from 'react'
import { Input } from "@/components/ui/input"

interface PromptBarProps {
  setPayload: (data: any) => void
}

function PromptBar({ setPayload }: PromptBarProps) {
  const [prompt, setPrompt] = React.useState('')

  const handleInputChange = ({ target }: any) => {
    setPrompt(target.value)
  }

  React.useEffect(() => {
    setPayload((preData: any) => { return { ...preData, prompt } });
  }, [prompt])

  return (
    <div className='w-full flex justify-center'>
      <Input type="text" placeholder="请输入图片修改要求" onChange={handleInputChange} />
    </div>
  )
}

export default PromptBar