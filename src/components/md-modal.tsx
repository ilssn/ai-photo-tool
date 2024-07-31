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
import MdContent from "./md-content"
import { FaBookReader } from "react-icons/fa";


interface PropsData {
  trigger: any
  content: string
  confirm: () => void
}

export function MdModal({ trigger, content, confirm }: PropsData) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild ref={trigger}>
        <Button disabled={!content} variant="default" size={"sm"} >
          <FaBookReader />
          <span className="px-1">查看</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="max-w-[600px]">
        <AlertDialogHeader>
          <AlertDialogTitle>文字提取结果</AlertDialogTitle>
          <AlertDialogDescription>
            以下是从图片中提取的文字内容展示
          </AlertDialogDescription>
        </AlertDialogHeader>
        <MdContent content={content} />
        <AlertDialogFooter>
          <AlertDialogCancel>关闭</AlertDialogCancel>
          <AlertDialogAction onClick={confirm}>复制</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
