import { UserModel } from '@core/domain/models/user.model';

export interface IUserRepository {
  getAllUsers(): Promise<UserModel[]>
}
