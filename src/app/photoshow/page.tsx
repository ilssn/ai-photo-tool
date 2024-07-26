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

  return (
    <div id="photoshow-page" className="w-full p-4 md:p-8">

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
