export type Status = 'Wait' | 'Ready' | 'Pending' | 'Done' | 'Finish' | 'Error'

export interface Tool {
  id: number
  name: string
  icon: string
  title: string
  desc: string
}

export interface Action {
  type: string
  payload: any
}

export interface History {
  id: number
  tool: string
  src: string
  action: any
  result: string
}