export interface IUser {
  emailAddress: string
  createdAt: string
  updatedAt: string
  isActive: boolean
}

export interface IUserQueryParams {
  search?: string
  page?: number
  limit?: number
}
