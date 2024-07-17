"use client"
import React from "react"
import PhotoshowLand from "./land"
import PhotoshowEdit from "./edit"
import { Tool } from "@/types"
import Locale from '@/locales'

const tools = Locale.Photo.Tool.list

export default function PhotoshowPage() {
  const [tool, setTool] = React.useState<Tool>(tools[0])
  const [file, setFile] = React.useState<File | null>(null)

  return (
    <div id="photoshow-page" className="w-full p-4 sm:p-8">
      {/* <div className="file">{file?.name}</div> */}
      {
        !file
          ? <PhotoshowLand setTool={setTool} tool={tool} setFile={setFile} file={file} />
          : <PhotoshowEdit setTool={setTool} tool={tool} setFile={setFile} file={file} />
      }
    </div>
  )
}
