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
import { twMerge } from 'tailwind-merge'

interface PropsData {
  confirm: (size: {width: number, height: number}) => void
}

export function SizeModal({ confirm }: PropsData) {
  const [size, setSize] = React.useState({width: 1, height: 1})

  const handleChangeWidth = ({ target }: any) => {
    setSize((size: any) => { return { ...size, width: target.value } });
  }

  const handleChangeHeight = ({ target }: any) => {
    setSize((size: any) => { return { ...size, height: target.value } });
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline" size={'sm'} className={twMerge('border-primary rounded-none rounded-r-sm')}>
          自定义
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>自定义画布比例</AlertDialogTitle>
          <AlertDialogDescription>
            请在下方输入宽高对应比例
          </AlertDialogDescription>
          <div className='w-full flex justify-between space-x-2 md:px-0'>
            <Input
              min={1}
              value={size.width}
              type="number"
              placeholder={'X'}
              onChange={handleChangeWidth}
            />
            <span>:</span>
            <Input
              min={1}
              value={size.height}
              type="number"
              placeholder={'H'}
              onChange={handleChangeHeight}
            />
          </div>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>取消</AlertDialogCancel>
          <AlertDialogAction onClick={() => confirm(size)}>确认</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
