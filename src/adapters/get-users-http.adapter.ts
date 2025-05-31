import { GetUsersUseCase } from '../core/usecases/get-users.usecase'
import { responseMessage } from '../utils/response-message'
import { Messages } from '../utils/constants/messages'
import { StatusCodes } from '../utils/constants/status-codes'
import { UserModel } from '../core/domain/models/user.model'
import { MessageCodes } from '../utils/constants/message-codes'
import { APIGatewayProxyEventV2 } from "aws-lambda"
import { bodyParser, headerParser } from "../utils/parsers"
import { Loggerfy } from "loggerfy"

const logger = new Loggerfy()

export const getUsersHttpAdapter = async (
  event: APIGatewayProxyEventV2,
  useCase: GetUsersUseCase
) => {
  try {
    logger
      .info()
      .setCode('getUsersHttpAdapter')
      .setDetail('Event data')
      .setMessage('Processing HTTP event data')
      .setMetadata({
        event
      })
      .write()

    headerParser<unknown>(event)
    bodyParser<unknown>(event)

    const usersFound = await useCase.invoke()

    return responseMessage<{
      code: string
      message: string
      data: UserModel[]
    }>({
      statusCode: StatusCodes.OPERATION_SUCCESSFULL,
      body: {
        code: MessageCodes.OPERATION_SUCCESSFUL,
        message: Messages.OPERATION_SUCCESSFUL,
        data: usersFound,
      },
    })
  } catch (err) {
    const error = err as Error
    logger
      .error()
      .setCode('getUsersHttpAdapter')
      .setDetail('Error processing request')
      .setMessage('Error processing request')
      .setMetadata({
        message: error.message
      })
      .write()

    if (error.message === Messages.SERVICE_UNAVAILABLE) {
      return responseMessage<{
        code: string
        message: string
        data: UserModel[]
      }>({
        statusCode: StatusCodes.SERVICE_NOT_AVAILABLE,
        body: {
          code: MessageCodes.SERVICE_NOT_AVAILABLE,
          message: Messages.SERVICE_UNAVAILABLE,
          data: [],
        },
      })
    }

    return responseMessage<{
      code: string
      message: string
      data: UserModel[]
    }>({
      statusCode: StatusCodes.UNCONTROLLER_ERROR,
      body: {
        code: MessageCodes.UNCONTROLLER_ERROR,
        message: Messages.UNCONTROLLER_ERROR,
        data: [],
      },
    })
  }
}
