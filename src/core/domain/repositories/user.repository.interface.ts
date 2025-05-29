import { UserModel } from '../models/user.model'

export interface IUserRepository {
  getAllUsers(): Promise<UserModel[]>
}
