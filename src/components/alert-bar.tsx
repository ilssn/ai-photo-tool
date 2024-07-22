import React, { useState } from 'react'
import { MdErrorOutline } from "react-icons/md";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useConfigStore } from '@/stores';

interface PropsData {
  errInfo: any
}

function AlertBar({ errInfo }: PropsData) {
  const {domain} = useConfigStore()
  const [errType, setErrType] = useState('')
  const [errContent, setErrorContent] = useState('')

  React.useEffect(() => {
    let showContent = JSON.stringify(errInfo)
    if (errInfo?.error && errInfo.error.err_code) {
      // todo
      setErrType('系统错误!')
      if (showContent.includes('-10001')) {
        showContent = `该工具已禁用/删除, 更多信息请访问 ${domain}`
      }
      if (showContent.includes('-10002')) {
        showContent = `该工具已禁用/删除, 更多信息请访问 ${domain}`
      }
      if (showContent.includes('-10003')) {
        showContent = `内部错误, 更多信息请访问 ${domain}`
      }
      if (showContent.includes('-10004')) {
        showContent = `账号欠费, 更多信息请访问 ${domain}`
      }
      if (showContent.includes('-10005')) {
        showContent = `验证码过期, 更多信息请访问 ${domain}`
      }
      if (showContent.includes('-10006')) {
        showContent = `该工具总额度已用完, 更多信息请访问 ${domain}`
      }
      if (showContent.includes('-10007')) {
        showContent = `该工具当日额度已用完, 更多信息请访问 ${domain}`
      }
      if (showContent.includes('-10012')) {
        showContent = `该工具在本小时额度已达上限，请注册 ${domain} 创建属于自己的工具`
      }

    } else {
      setErrType('请求错误!')
      showContent = '数据异常，请稍后重试！'

    }
    setErrorContent(showContent)
  }, [errInfo])

  return (
    <Alert variant="destructive">
      <MdErrorOutline className="h-4 w-4" />
      <AlertTitle className='text-md'>{errType}</AlertTitle>
      <AlertDescription className="text-sm ">
        {errContent.split(" ").map((word, index) => {
          const urlPattern = /(https?:\/\/[^\s]+)/g;
          if (urlPattern.test(word)) {
            return (
              <a
                key={index}
                href={word}
                target="_blank"
                rel="noopener noreferrer"
                className="underline text-violet-500"
              >
                {/* {word} */}
                {'302.AI'}
              </a>
            );
          }
          return word + " ";
        })}
      </AlertDescription>
    </Alert>
  )
}

export default AlertBar