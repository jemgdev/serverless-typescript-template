import { User } from '../../../domain/User'
import { UserRepository } from '../../ports/UserRepository'

export class CreateUser {
  constructor (private readonly userRepository: UserRepository) {}

  async execute (input: {
    name: string
    lastname: string
    age: number
    identificationNumber: string
    identificationType: string
  }): Promise<void> {
    const user = User.create(input)
    await this.userRepository.save(user)
  }
}
