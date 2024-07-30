import React from 'react'
import { Button } from './ui/button'

interface PropsData {
  media: string
  setMedia: (media: string) => void
}

const medias = [
  {
    name: '图片',
    value: 'image',
  },
  {
    name: '视频',
    value: 'video',
  },
]

function MediaBar({ media, setMedia}: PropsData) {

  const handleChange = (media: string) => {
    setMedia(media);
  }

  return (
    <div className='w-full flex justify-center space-x-2 text-md'>
      {
        medias.map((it, idx) =>
          <Button
            variant={it.value === media? 'default' : 'outline'}
            size={'sm'}
            key={idx}
            onClick={() => handleChange(it.value)}
          >
            {it.name}
          </Button>
        )
      }
    </div>
  )
}

export default MediaBar