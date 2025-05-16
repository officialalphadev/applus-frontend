import { IPagableResponse, IUser, IUserQueryParams } from '@/type'
import { axios } from '@/lib'

export class UserService {
  static async GetUsers(params?: IUserQueryParams): Promise<IPagableResponse<IUser>> {
    const response = await axios.get<IPagableResponse<IUser>>('/users', { params })
    return response.data
  }
}
