import React from 'react'
import { Button } from './ui/button'
import { twMerge } from 'tailwind-merge'

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
  {
    name: '1280:768',
    value: 1280 / 768,
  },
  {
    name: '自定义',
    value: 0,
  },
]

function RatioBar({ payload, setPayload }: PropsData) {

  const handleChangeModel = (model: string) => {
    setPayload((preData: any) => { return { ...preData, model } });
  }

  const handleChangeRatio = (ratio: number, name: string) => {
    setPayload((preData: any) => { return { ...preData, ratio, label: name } });
  }

  React.useEffect(() => {
    if (payload.model === 'luma') {
      setPayload((preData: any) => { return { ...preData, ratio: 0, label: '' } });
    }
    else if (payload.model === 'runway') {
      setPayload((preData: any) => { return { ...preData, ratio: 1280 / 768, label: '1280:768' } });
    } else {
      setPayload((preData: any) => { return { ...preData, ratio: 1 / 1, label: '1:1' } });
    }

  }, [payload.model])

  return (
    <div className='w-full flex flex-col space-y-2 justify-center items-center '>
      <div className="flex rounded-sm text-md">
        {
          models.map((it, idx) =>
            <Button
              className={twMerge('border-primary rounded-none', idx === 0 && 'rounded-l-sm', idx === 2 && 'rounded-r-sm', idx == 1 && 'border-x-0')}
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
        {payload.model === 'kling' &&
          ratios.slice(0, 3).map((it, idx) =>
            <Button
              variant={it.value === payload.ratio ? 'default' : 'outline'}
              size={'sm'}
              key={it.name}
              onClick={() => handleChangeRatio(it.value, it.name)}
            >
              {it.name}
            </Button>
          )
        }
        {payload.model === 'runway' &&
          ratios.slice(3, 4).map((it, idx) =>
            <Button
              variant={it.value === payload.ratio ? 'default' : 'outline'}
              size={'sm'}
              key={it.name}
              onClick={() => handleChangeRatio(it.value, it.name)}
            >
              {it.name}
            </Button>
          )
        }
        {payload.model === 'luma' &&
          ratios.slice(4, 5).map((it, idx) =>
            <Button
              variant={it.value === payload.ratio ? 'default' : 'outline'}
              size={'sm'}
              key={it.name}
              onClick={() => handleChangeRatio(it.value, it.name)}
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