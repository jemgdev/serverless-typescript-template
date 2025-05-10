
import { ILoggerRepository } from "@domain/repositories/logger.repository.interface";
import { UserModel } from "@domain/models/user.model";
import { IUserRepository } from "@domain/repositories/user.repository.interface";

export class UserMemoryRepository implements IUserRepository {
  constructor (private readonly logger: ILoggerRepository) {}

  async getAllUsers(): Promise<UserModel[]> {
    const users: UserModel[] = [
      {
        name: 'Josué',
        lastname: 'Medina',
        age: 23,
        identificationType: 'DNI',
        identificationNumber: '2893930383'
      }
    ]

    this.logger.info({
      code: 'UserMemoryRepository',
      message: 'UserMemoryRepository.getAllUsers',
      detail: 'User data to print',
      metadata: {
        users
      }
    })
  
    return users
  }
}