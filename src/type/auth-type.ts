export interface ISignIn {
  accessToken: string
  refreshToken: string
  tokenType: string
}

export interface ISignInBody {
  emailAddress: string
  password: string
}

export interface IMyProfile {
  userId: number
  emailAddress: string
}
