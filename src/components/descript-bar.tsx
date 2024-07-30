import React from 'react'
import { Input } from "@/components/ui/input"

interface PropsData {
  payload: any
  setPayload: (data: any) => void
  placeHolder?: string
}

function DescriptBar({ payload, setPayload, placeHolder }: PropsData) {

  const handleInputChange = ({ target }: any) => {
    setPayload((preData: any) => { return { ...preData, descript: target.value } });
  }

  return (
    <div className='w-full flex justify-center px-1 md:px-0'>
      <Input
        value={payload.descript}
        type="text"
        placeholder={placeHolder ? placeHolder : '请输入视频要求'}
        onChange={handleInputChange}
      />
    </div>
  )
}

export default DescriptBar