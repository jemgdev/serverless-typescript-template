import { UserModel } from "@domain/models/user.model";

export interface IUserRepository {
  getAllUsers(): Promise<UserModel[]>
}