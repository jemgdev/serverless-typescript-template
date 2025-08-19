import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda'
import { Loggerfy } from 'loggerfy'
import { GetAllUsers } from '@user/application/usecases/query/GetAllUsers'
import { InMemoryUserRepository } from '@user/infrastructure/driven/InMemoryUserRepository'
import { responseMessage } from '@shared/utils/response-message'
import { StatusCodes } from '@shared/utils/constants/StatusCodes'
import { MessageCodes } from '@shared/utils/constants/MessageCodes'
import { Messages } from '@shared/utils/constants/Messages'

export const handler = async (
  event: APIGatewayProxyEventV2
): Promise<APIGatewayProxyResultV2> => {
  const logger = new Loggerfy()

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
