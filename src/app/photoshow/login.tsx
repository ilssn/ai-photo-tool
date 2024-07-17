import React from 'react'
import { LoginForm } from '@/components/login-form'

import { useConfigStore } from "@/stores";

function PhotoshowLogin() {
  const { domain } = useConfigStore();

  return (
    <div className="fixed bottom-0 right-0 z-[9999] h-screen flex-col sm:p-12 bg-[#f5f5f5] h-100vh w-full">
      <div className="relative w-full h-full flex flex-col sm:p-6 justify-center bg-white sm:border-[1px] sm:border-solid sm:border-[rgba(222,222,222,1)] sm:rounded-2xl sm:shadow-xl max-w-[1200px] items-center m-auto">
        <div className="absolute left-6 top-6 w-[120px]">
          <a href={domain} target="_blank">
            <img width="100%" height="auto" src="/banner.png" alt="logo" />
          </a>
        </div>
        <LoginForm />
      </div>
    </div>
  )
}

export default PhotoshowLogin