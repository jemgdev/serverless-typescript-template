import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda'
import { GetAllUsers } from '@user/application/usecases/query/GetAllUsers'
import { InMemoryUserRepository } from '@user/infrastructure/driven/InMemoryUserRepository'
import { responseMessage } from '@shared/utils/response-message'
import { StatusCodes } from '@shared/utils/constants/StatusCodes'
import { MessageCodes } from '@shared/utils/constants/MessageCodes'
import { Messages } from '@shared/utils/constants/Messages'
import { Logger } from '@shared/libraries/logger/Logger'

const logger = new Logger()

export const handler = async (
  event: APIGatewayProxyEventV2
): Promise<APIGatewayProxyResultV2> => {
  try {
    logger.info('Http event data', 'GET_USERS', 'Http event data', {
      event
    })

    const userRepository = new InMemoryUserRepository()
    const getAllUsers = new GetAllUsers(userRepository)

    const users = await getAllUsers.execute()
    const finalUsers = users.map(user => user.toPrimitives())

    return responseMessage<{
      code: string
      message: string
      data: any[]
    }>({
      statusCode: StatusCodes.OPERATION_SUCCESSFUL,
      body: {
        code: MessageCodes.OPERATION_SUCCESSFUL,
        message: Messages.OPERATION_SUCCESSFUL,
        data: finalUsers
      }
    })
  } catch (err) {
    const error = err as Error
    logger.error('Http event error', 'GET_USERS', 'Http event error', {
      message: error.message
    })

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
