import React from 'react'
import { Input } from "@/components/ui/input"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"

interface PropsData {
  title: string
  status: string
  payload: any
  setPayload: (data: any) => void
  placeHolder?: string
  confirm: () => void
}

export function DescriptModal({ title, status, payload, setPayload, placeHolder, confirm }: PropsData) {

  const handleInputChange = ({ target }: any) => {
    setPayload((preData: any) => { return { ...preData, prompt: target.value } });
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {/* <Button variant="outline" className="border-primary text-primary">退出</Button> */}
        <Button variant="default" disabled={status === 'Pending'}>{title}</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>视频生成要求</AlertDialogTitle>
          <AlertDialogDescription>
            可输入对生成视频的具体描述，如果没有输入则会自动根据图片生成
          </AlertDialogDescription>
          <div className='w-full flex justify-center px-1 md:px-0'>
            <Input
              value={payload.prompt}
              type="text"
              placeholder={placeHolder ? placeHolder : '请输入视频要求'}
              onChange={handleInputChange}
            />
          </div>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>取消</AlertDialogCancel>
          <AlertDialogAction onClick={confirm}>确认</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
