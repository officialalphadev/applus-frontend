import { IMyProfile, IResponse, ISignIn, ISignInBody } from '@/type'
import { axios } from '@/lib'

export class AuthService {
  static async SignIn(body: ISignInBody): Promise<IResponse<ISignIn>> {
    const response = await axios.post<IResponse<ISignIn>>('/auth/sign-in', body)
    return response.data
  }

  static async SignOut(): Promise<IResponse> {
    const response = await axios.delete<IResponse>('/auth/sign-out')
    return response.data
  }

  static async GetMyProfile(): Promise<IResponse<IMyProfile>> {
    const response = await axios.get<IResponse<IMyProfile>>('/auth/my-profile')
    return response.data
  }
}
