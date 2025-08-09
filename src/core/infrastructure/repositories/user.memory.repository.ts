import { Loggerfy } from 'loggerfy'
import { UserModel } from '../../domain/models/user.model'
import { UserRepository } from '../../domain/repositories/user.repository'

export class UserMemoryRepository implements UserRepository {
  logger: Loggerfy

  constructor () {
    this.logger = new Loggerfy()
  }

  async getAllUsers (): Promise<UserModel[]> {
    const users: UserModel[] = [
      {
        name: 'Josué',
        lastname: 'Medina',
        age: 23,
        identificationType: 'DNI',
        identificationNumber: '2893930383'
      }
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
