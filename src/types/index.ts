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


export type Status = 'Wait' | 'Ready' | 'Pending' | 'Done' | 'Finish' | 'Error'