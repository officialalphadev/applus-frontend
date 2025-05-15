import { IMyProfileResponse, ISignInBody, ISignInResponse, ISignOutResponse } from '@/type'
import { axios } from '@/lib'

export class AuthService {
  static async SignIn(body: ISignInBody): Promise<ISignInResponse> {
    const response = await axios.post<ISignInResponse>('/auth/sign-in', body)
    return response.data
  }

  static async SignOut(): Promise<ISignOutResponse> {
    const response = await axios.delete<ISignOutResponse>('/auth/sign-out')
    return response.data
  }

  static async GetMyProfile(): Promise<IMyProfileResponse> {
    const response = await axios.get<IMyProfileResponse>('/auth/my-profile')
    return response.data
  }
}
