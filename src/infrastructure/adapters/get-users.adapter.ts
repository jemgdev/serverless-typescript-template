import { GetUsersUseCase } from '@usecases/get-users.usecase'
import { UserMemoryRepository } from '@infrastructure/repositories/user/user.memory.repository'
import { responseMessage } from '@utils/response-message'
import { Messages } from '@utils/constants/messages'
import { StatusCodes } from '@utils/constants/status-codes'

const userRepository = new UserMemoryRepository()
const getUsersUseCase = new GetUsersUseCase(userRepository)

export const getUsersHttpAdapter = async () => {
  try {
    const usersFound = await getUsersUseCase.invoke()

    return responseMessage({
      statusCode: StatusCodes.OPERATION_SUCCESSFUL,
      body: usersFound
    })
  } catch (error) {
    if (error.message === Messages.SERVICE_UNAVAILABLE) {
      return responseMessage({
        statusCode: StatusCodes.SERVICE_NOT_AVAILABLE
      })
    }

    return responseMessage({
      statusCode: StatusCodes.UNCONTROLLER_ERROR
    })
  }
}