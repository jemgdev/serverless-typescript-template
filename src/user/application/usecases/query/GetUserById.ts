import { User } from '../../../domain/User'
import { UserPersistanceRepository } from '../../ports/UserPersistanceRepository'

export class GetUserById {
  constructor (private readonly userRepository: UserPersistanceRepository) {}

  async execute (id: string): Promise<User | null> {
    const user = await this.userRepository.findById(id)
    return user
  }
}
