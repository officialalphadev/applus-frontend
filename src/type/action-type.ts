export type ActionReturn = {
  status: 'success' | 'error'
  message: string
}

export type ActionState = {
  status: 'idle' | 'success' | 'error'
  errors: null | {
    [x: string]: string[] | undefined
    [x: number]: string[] | undefined
    [x: symbol]: string[] | undefined
  }
}
