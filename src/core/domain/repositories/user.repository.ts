import { UserModel } from '../models/user.model'

export interface UserRepository {
  getAllUsers(): Promise<UserModel[]>
}
