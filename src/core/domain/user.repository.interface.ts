import { UserModel } from "./user.model";

export interface IUserRepository {
  getAllUsers(): Promise<UserModel[]>
}