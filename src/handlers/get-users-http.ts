import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda'
import { Loggerfy } from 'loggerfy'
import { GetUsersUseCase } from '../core/usecases/get-users.usecase'
import { UserMemoryRepository } from '../core/infrastructure/repositories/user.memory.repository'
import { getUsersHttpAdapter } from '../adapters/get-users-http.adapter'
import { MessageCodes } from '../utils/constants/message-codes'
import { Messages } from '../utils/constants/messages'
import { responseMessage } from '../utils/response-message'
import { StatusCodes } from '../utils/constants/status-codes'

const logger = new Loggerfy()
const userRepository = new UserMemoryRepository()
const getUsersUseCase = new GetUsersUseCase(userRepository)

export const handler = async (
  event: APIGatewayProxyEventV2
): Promise<APIGatewayProxyResultV2> => {
  try {
    logger
      .info()
      .setCode('handler')
      .setDetail('Event data')
      .setMessage('SQS event data')
      .setMetadata({
        event
      })
      .write()

    const response = await getUsersHttpAdapter(event, getUsersUseCase)
    return response
  } catch (err) {
    const error = err as Error
    logger
      .error()
      .setCode('handler')
      .setDetail('Error processing request')
      .setMessage('Error processing request')
      .setMetadata({
        message: error.message
      })
      .write()

    return responseMessage<{
      code: string
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
