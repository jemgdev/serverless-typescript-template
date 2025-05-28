import { UserModel } from '../../../../core/domain/models/user.model'
import { IUserRepository } from '../../../../core/domain/repositories/user.repository.interface'
import { Loggerfy } from 'loggerfy'

export class UserMemoryRepository implements IUserRepository {
  logger: Loggerfy

  constructor() {
    this.logger = new Loggerfy()
  }

  async getAllUsers(): Promise<UserModel[]> {
    const users: UserModel[] = [
      {
        name: 'Josué',
        lastname: 'Medina',
        age: 23,
        identificationType: 'DNI',
        identificationNumber: '2893930383',
      },
    ]

    this.logger
      .info()
      .setCode('UserMemoryRepository')
      .setDetail('UserMemoryRepository.getAllUsers')
      .setMessage('User data to print')
      .setMetadata({ users })
      .write()

    return users
  }
}
