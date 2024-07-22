import React from 'react'
import { Button } from './ui/button'

interface PropsData {
  payload: any
  setPayload: (data: any) => void
}

const lights = [
  {
    name: '自动打光',
    value: 'None',
  },
  {
    name: '左侧灯光',
    value: 'Left Light',
  },
  {
    name: '右侧灯光',
    value: 'Right Light',
  },
  {
    name: '顶部灯光',
    value: 'Top Light',
  },
  {
    name: '底部灯光',
    value: 'Botom Light',
  },
]

function LightBar({ payload, setPayload }: PropsData) {

  const handleChangeLight = (light: string) => {
    setPayload((preData: any) => { return { ...preData, light} });
  }

  return (
    <div className='w-full flex justify-center space-x-2 text-md'>
      {
        lights.map((it, idx) =>
          <Button
            variant={it.value === payload.light? 'default' : 'outline'}
            size={'sm'}
            key={idx}
            onClick={() => handleChangeLight(it.value)}
          >
            {it.name}
          </Button>
        )
      }
    </div>
  )
}

export default LightBar