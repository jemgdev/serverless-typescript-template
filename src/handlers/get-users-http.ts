import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda'
import { Loggerfy } from 'loggerfy'
import { GetUsersUseCase } from '../core/usecases/get-users.usecase'
import { UserMemoryRepository } from '../core/infrastructure/repositories/user.memory.repository'
import { getUsersHttpAdapter } from '../adapters/get-users.adapter'
import { MessageCodes } from '../utils/constants/message-codes'
import { Messages } from '../utils/constants/messages'
import { responseMessage } from '../utils/response-message'
import { StatusCodes } from '../utils/constants/status-codes'

const logger = new Loggerfy()
const userRepository = new UserMemoryRepository()
const getUsersUseCase = new GetUsersUseCase(userRepository)

export const handler = async (
  event: APIGatewayProxyEventV2,
): Promise<APIGatewayProxyResultV2> => {
  logger
    .info()
    .setCode('handler')
    .setDetail('Event data')
    .setMessage('SQS event data')
    .setMetadata({
      event,
    })
    .write()

  try {
    const response = await getUsersHttpAdapter(getUsersUseCase)
    return response
  } catch (error) {
    return responseMessage<{
      code: string
      message: string
    }>({
      statusCode: StatusCodes.UNCONTROLLER_ERROR,
      body: {
        code: MessageCodes.UNCONTROLLER_ERROR,
        message: Messages.UNCONTROLLER_ERROR,
      },
    })
  }
}
