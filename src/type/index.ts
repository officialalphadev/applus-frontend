export * from './action-type'
export * from './auth-type'
export * from './product-type'
export * from './user-type'

export interface IResponse<T = undefined> {
  statusCode: number
  message: string
  data: T
}

export interface IPagableResponse<T = undefined> {
  statusCode: number
  message: string
  data: {
    meta: {
      page: number
      pages: number
      limit: number
      total: number
      naivgation: {
        prevPage: number | null
        nextPage: number | null
      }
    }
    rows: T[]
  }
}
