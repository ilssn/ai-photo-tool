import React from 'react'
import { Button } from './ui/button'

interface PropsData {
  scale: string
  setScale: (scale: string) => void
}

const scales = ['2', '4', '8']

function ScaleBar({ scale, setScale }: PropsData) {
  return (
    <div className='w-full flex justify-center space-x-2 text-md'>
      {
        scales.map((it, idx) =>
          <Button
            variant={it === scale ? 'default' : 'outline'}
            size={'sm'}
            key={idx}
            onClick={() => setScale(it)}
          >
            x{it}
          </Button>
        )
      }
    </div>
  )
}

export default ScaleBar