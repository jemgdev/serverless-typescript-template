import { IUserRepository } from '../user.repository.interface'

export class GetUsersUseCase {
  constructor (private readonly userRepository: IUserRepository) {}

  async invoke () {
    const usersFound = await this.userRepository.getAllUsers()
    return usersFound
  }
}