import { Messages } from '../constants/messages'
import { IUserRepository } from '../infrastructure/driven/repository/user/user.repository.interface'

export class GetUsersUseCase {
  constructor (private readonly userRepository: IUserRepository) {}

  async invoke () {
    try {
      const usersFound = await this.userRepository.getAllUsers()
      return usersFound
    } catch (error: any) {
      if (error.message === Messages.SERVICE_UNAVAILABLE) {
        throw new Error(Messages.SERVICE_UNAVAILABLE)
      }

      throw new Error(Messages.UNCONTROLLER_ERROR)
    }
  }
}