"use client"
import React from "react"
import PhotoshowLand from "./land"
import PhotoshowEdit from "./edit"

export default function PhotoshowPage() {
  const [file, setFile] = React.useState<File | undefined>()

  return (
    <div id="photoshow-page" className="w-full p-4 sm:p-8">
      {/* <div className="file">{file?.name}</div> */}
      {
        !file
          ? <PhotoshowLand setFile={setFile} file={file} />
          : <PhotoshowEdit setFile={setFile} file={file} />
      }
    </div>
  )
}
