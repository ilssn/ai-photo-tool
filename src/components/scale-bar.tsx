import React from 'react'
import { Button } from './ui/button'

interface PropsData {
  setPayload: (data: any) => void
}

const scales = ['2', '4', '8']

function ScaleBar({ setPayload }: PropsData) {
  const [scale, setScale] = React.useState('2')

  const handleChangeScale = (scale: string) => {
    setScale(scale)
  }

  React.useEffect(() => {
    setPayload((preData: any) => { return { ...preData, scale } });
  }, [scale])

  return (
    <div className='w-full flex justify-center space-x-2 text-md'>
      {
        scales.map((it, idx) =>
          <Button
            variant={it === scale ? 'default' : 'outline'}
            size={'sm'}
            key={idx}
            onClick={() => handleChangeScale(it)}
          >
            x{it}
          </Button>
        )
      }
    </div>
  )
}

export default ScaleBar