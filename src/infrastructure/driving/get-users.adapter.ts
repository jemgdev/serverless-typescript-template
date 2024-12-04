import { APIGatewayProxyEventV2 } from 'aws-lambda'
import { Messages } from '../../constants/messages'
import { GetUsersUseCase } from '../../domain/usecases/get-users.usecase'
import { UserMemoryRepository } from '../driven/repository/user/user.memory.repository'

const userRepository = new UserMemoryRepository()
const getUsersUseCase = new GetUsersUseCase(userRepository)

export const getUsersHttpAdapter = async (_event: APIGatewayProxyEventV2) => {
  try {
    const usersFound = await getUsersUseCase.invoke()

    return usersFound
  } catch (error: any) {
    throw new Error(error.message)
  }
}