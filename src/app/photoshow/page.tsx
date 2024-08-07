"use client"
import React from "react"
import PhotoshowLand from "./land"
import PhotoshowEdit from "./edit"
import PhotoshowLogin from "./login"
import { useConfigStore } from "@/stores";
import { Tool } from "@/types"

import Locale from '@/locales'

const tools = Locale.Photo.Tool.list

export default function PhotoshowPage() {
  const { region, domain, token } = useConfigStore();
  const [tool, setTool] = React.useState<Tool>(tools[0])
  const [file, setFile] = React.useState<File | null>(null)


  React.useEffect(() => {
    const hostname = window.location.hostname;
    const domain = hostname.split('.')[0];
    if (!['demo'].includes(domain)) {
      if (!(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))) {
        var script = document.createElement("script");
        script.src = "https://assets.salesmartly.com/js/project_177_61_1649762323.js";
        document.head.appendChild(script);
      }
    }

    // 清除脚本
    return () => {
      const existingScript = document.querySelector("[src='https://assets.salesmartly.com/js/project_177_61_1649762323.js']");
      existingScript && document.head.removeChild(existingScript);
    };
  }, []);

  return (
    <div id="photoshow-page" className="w-full p-4">

      {
        !token && <PhotoshowLogin />
      }

      {
        !file
          ? <PhotoshowLand tool={tool} setTool={setTool} file={file} setFile={setFile} />
          : <PhotoshowEdit tool={tool} setTool={setTool} file={file} setFile={setFile} />
      }
    </div>
  )
}
