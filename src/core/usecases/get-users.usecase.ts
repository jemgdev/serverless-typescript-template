import { UserRepository } from '../domain/repositories/user.repository'

export class GetUsersUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async invoke() {
    const usersFound = await this.userRepository.getAllUsers()
    return usersFound
  }
}
