import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda'
import { Loggerfy } from 'loggerfy'
import { CreateUser } from '@user/application/usecases/command/CreateUser'
import { InMemoryUserRepository } from '@user/infrastructure/driven/InMemoryUserRepository'
import { bodyParser } from '@shared/utils/parsers'
import { responseMessage } from '@shared/utils/response-message'
import { StatusCodes } from '@shared/utils/constants/status-codes'
import { MessageCodes } from '@shared/utils/constants/message-codes'
import { Messages } from '@shared/utils/constants/messages'

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

    const body = bodyParser<{
      name: string
      lastname: string
      age: number
      identificationNumber: string
      identificationType: string
    }>(event)

    const userRepository = new InMemoryUserRepository()
    const createUser = new CreateUser(userRepository)

    await createUser.execute(body)

    return responseMessage<{
      code: string
      message: string
    }>({
      statusCode: StatusCodes.OPERATION_SUCCESSFUL,
      body: {
        code: MessageCodes.OPERATION_SUCCESSFUL,
        message: Messages.OPERATION_SUCCESSFUL
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
