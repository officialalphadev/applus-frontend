export interface LoginResponse {
  id: number
  username: string
  email: string
  firstName: string
  lastName: string
  gender: string
  image: string
  token: string
}

export interface ISignInResponse {
  statusCode: number
  message: string
  data: {
    accessToken: string
    refreshToken: string
    tokenType: string
  }
}

export interface ISignInBody {
  emailAddress: string
  password: string
}

export interface ISignOutResponse {
  statusCode: number
  message: string
}

export interface IMyProfileResponse {
  statusCode: number
  message: string
  data: {
    userId: number
    emailAddress: string
  }
}
