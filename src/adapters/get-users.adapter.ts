import { APIGatewayProxyEventV2 } from 'aws-lambda'
import { Messages } from '../constants/messages'
import { GetUsersUseCase } from '../core/application/get-users.usecase'
import { UserMemoryRepository } from '../core/infrastructure/user.memory.repository'
import { responseMessage } from '../utils/response-message'
import { StatusCodes } from '../constants/status-codes'

const userRepository = new UserMemoryRepository()
const getUsersUseCase = new GetUsersUseCase(userRepository)

export const getUsersHttpAdapter = async (_event: APIGatewayProxyEventV2) => {
  try {
    const usersFound = await getUsersUseCase.invoke()

    return responseMessage({
      statusCode: StatusCodes.OPERATION_SUCCESSFUL,
      body: usersFound
    })
  } catch (error) {
    throw new Error(Messages.UNCONTROLLER_ERROR)
  }
}