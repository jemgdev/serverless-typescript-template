import { User } from '../../../domain/User'
import { UserPersistanceRepository } from '../../ports/UserPersistanceRepository'

export class GetAllUsers {
  constructor (private readonly userRepository: UserPersistanceRepository) {}

  async execute (): Promise<User[]> {
    const users = await this.userRepository.findAll()
    return users
  }
}
