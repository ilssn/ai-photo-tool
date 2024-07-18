"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import Loading from "./loading"
// import { env } from "@/env.mjs";
import { useConfigStore } from "@/stores";
import { AUTH_CODE, AUTH_TOKEN } from "@/constants"
import { useRouter } from 'next/navigation'

const AUTH_URL = process.env.NEXT_PUBLIC_302AI_AUTH;

const LockSVG = () => (
  <svg className="lock_svg__icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="50" height="50"><path d="M153.6 469.312v469.376h716.8V469.312H153.6zM64 384h896v640H64V384zm403.2 329.92c-26.752-14.72-44.8-42.304-44.8-73.92 0-47.104 40.128-85.312 89.6-85.312 49.472 0 89.6 38.208 89.6 85.312 0 31.616-18.048 59.136-44.8 73.92v115.968a44.8 44.8 0 0 1-89.6 0V713.92zM332.8 384h358.4V256c0-94.272-80.256-170.688-179.2-170.688-98.944 0-179.2 76.416-179.2 170.688v128zM512 0c148.48 0 268.8 114.56 268.8 256v128H243.2V256C243.2 114.56 363.52 0 512 0z" fill="currentColor"></path></svg>
);

export const fetchAuth = async (user: string, code: string): Promise<any> => {
  const response = await fetch(`${AUTH_URL}/${user}?pwd=${code}`);
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || "Failed to fetch auth");
  }
  const data = await response.json();
  return data;
};

export function LoginForm() {
  const { setToken, setUser, setCode, setRegion, setDomain } = useConfigStore();
  const [loading, setLoading] = useState(true)
  const [cache, setCache] = useState(true)
  const [inputCode, setInputCode] = useState('')
  const [tip, setTip] = useState('')

  const router = useRouter()

  const handleChangeCode = ({ target }: any) => {
    setInputCode(target.value)
    setTip('')
  }

  const handleToggleCache = (value: any) => {
    setCache(value)
  }

  const handleLoginSubmit = async (acceptCode?: string) => {
    const userName = window.location.hostname.split('.')[0]
    const authCode = acceptCode || inputCode
    try {
      setLoading(true)
      const res = await fetchAuth(userName, authCode)
      if (res.code === 0) {
        setRegion(res.data.region)
        // save code
        if (cache) {
          window.localStorage.setItem(AUTH_CODE, authCode)
          window.localStorage.setItem(AUTH_TOKEN, res.data.api_key)
        }
        // set domain
        if (res.data.region === 0) {
          setDomain('https://302ai.cn')
        }
        // save token
        setToken(res.data.api_key)
        // save user
        setUser(userName)
        // save code
        setCode(authCode)
        // reflesh
        const userAgent = navigator.userAgent.toLowerCase();
        if (!userAgent.includes('quark')) {
          router.replace(window.location.pathname)
        }
      } else {
        setTip(res.msg.split(',')[0])
      }
    } catch (error) {
      setTip('网络错误！')

    } finally {
      setLoading(false)
    }

  }

  useEffect(() => {
    const cacheCode = window.localStorage.getItem(AUTH_CODE) || ''
    const params = new URLSearchParams(window.location.search);
    const paramCode = params.get('pwd')
    const paramRegion = params.get('region')
    const currentCode = paramCode || cacheCode || ''
    setCode(currentCode)
    handleLoginSubmit(currentCode)
    if (paramRegion === '0') {
      setRegion(Number(paramRegion))
      setDomain('https://302ai.cn')
    }
  }, [])

  if (loading) return (
    <Loading />
  )

  return (
    <Card className="w-full max-w-xs border-none bg-white shadow-none text-center">
      <CardHeader>
        <CardTitle className="space-y-2 text-lg text-black">
          <div className="w-full flex justify-center">
            <LockSVG />
          </div>
          <p className="text-md">需要分享码</p>
        </CardTitle>
        <CardDescription>
          创建者开启了验证，请在下方填入分享码
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col justify-center items-center space-y-2">
        <div className="">
          <Input onChange={handleChangeCode} value={inputCode} type="password" placeholder="请输入分享码" className="text-center max-w-[200px]" />
        </div>
        {tip &&
          <div className="">
            <p className="text-sm text-red-500">{tip}</p>
          </div>
        }
      </CardContent>
      <CardFooter className="flex flex-col items-center justify-center space-y-2">
        <Button variant="default" onClick={() => handleLoginSubmit()} className="w-full max-w-[200px]">确认</Button>
        <div className="flex items-center space-x-2">
          <Checkbox onCheckedChange={handleToggleCache} checked={cache} />
          <Label
            htmlFor="terms"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            记住验证码
          </Label>
        </div>
      </CardFooter>
    </Card>
  )
}
