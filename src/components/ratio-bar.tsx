import React from 'react'
import { Button } from './ui/button'

interface PropsData {
  payload: any
  setPayload: (data: any) => void
}

const models = [
  {
    name: 'Kling',
    value: 'kling',
  },
  {
    name: 'Runway',
    value: 'runway',
  },
  {
    name: 'Luma',
    value: 'luma',
  },
]

const ratios = [
  {
    name: '1:1',
    value: 1 / 1,
  },
  {
    name: '16:9',
    value: 16 / 9,
  },
  {
    name: '9:16',
    value: 9 / 16,
  },
]

function RatioBar({ payload, setPayload }: PropsData) {

  const handleChangeModel = (model: string) => {
    setPayload((preData: any) => { return { ...preData, model } });
  }

  const handleChangeRatio = (ratio: number) => {
    setPayload((preData: any) => { return { ...preData, ratio } });
  }

  React.useEffect(() => {
    console.log('model:::', payload.model)
    if (payload.model === 'kling') {
      setPayload((preData: any) => { return { ...preData, ratio: null } });
    } else {
      setPayload((preData: any) => { return { ...preData, ratio: 1/1 } });
    }

  }, [payload.model])

  return (
    <div className='w-full flex flex-col space-y-2 justify-center items-center '>
      <div className="flex space-x-2 text-md">
        {
          models.map((it, idx) =>
            <Button
              variant={it.value === payload.model ? 'default' : 'outline'}
              size={'sm'}
              key={idx}
              onClick={() => handleChangeModel(it.value)}
            >
              {it.name}
            </Button>
          )
        }

      </div>
      <div className="flex space-x-2 text-md">
        {
          ratios.map((it, idx) =>
            <Button
              variant={it.value === payload.ratio ? 'default' : 'outline'}
              size={'sm'}
              key={idx}
              onClick={() => handleChangeRatio(it.value)}
            >
              {it.name}
            </Button>
          )
        }

      </div>
    </div>
  )
}

export default RatioBar