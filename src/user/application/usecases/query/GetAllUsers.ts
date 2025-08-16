import { User } from '../../../domain/User'
import { UserRepository } from '../../ports/UserRepository'

export class GetAllUsers {
  constructor (private readonly userRepository: UserRepository) {}

  async execute (): Promise<User[]> {
    const users = await this.userRepository.findAll()
    return users
  }
}
