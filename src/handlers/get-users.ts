import { responseMessage } from '../utils/response-message'
import { StatusCodes } from '../utils/constants/status-codes'
import { getUsersHttpAdapter } from '../adapters/get-users.adapter'
import { GetUsersUseCase } from '../core/usecases/get-users.usecase'
import { UserMemoryRepository } from '../core/infrastructure/repositories/user/user.memory.repository'
import { MessageCodes } from "../utils/constants/message-codes"
import { Messages } from "../utils/constants/messages"

const userRepository = new UserMemoryRepository()
const getUsersUseCase = new GetUsersUseCase(userRepository)

export const handler = async () => {
  try {
    const response = await getUsersHttpAdapter(getUsersUseCase)
    return response
  } catch (error) {
    return responseMessage<{
      code: string,
      message: string
    }>({
      statusCode: StatusCodes.UNCONTROLLER_ERROR,
      body: {
        code: MessageCodes.UNCONTROLLER_ERROR,
        message: Messages.UNCONTROLLER_ERROR
      }
    })
  }
}
