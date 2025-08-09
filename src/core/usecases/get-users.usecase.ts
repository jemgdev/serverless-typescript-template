import { UserModel } from '../domain/models/user.model'
import { UserRepository } from '../domain/repositories/user.repository'

export class GetUsersUseCase {
  constructor (private readonly userRepository: UserRepository) { }

  async invoke (): Promise<UserModel[]> {
    const usersFound = await this.userRepository.getAllUsers()
    return usersFound
  }
}
