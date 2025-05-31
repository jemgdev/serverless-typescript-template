import { Loggerfy } from 'loggerfy'
import { GetUsersUseCase } from '../core/usecases/get-users.usecase'
import { responseMessage } from '../utils/response-message'
import { StatusCodes } from '../utils/constants/status-codes'
import { UserModel } from "../core/domain/models/user.model"

const logger = new Loggerfy()

export const getUsersSqsAdapter = async (
  usecase: GetUsersUseCase,
  message: unknown // Assuming message is of type unknown, adjust as necessary
) => {
  logger
    .info()
    .setCode('getUsersSqsAdapter')
    .setDetail('Message data')
    .setMessage('Processing SQS message')
    .setMetadata({
      message
    })
    .write()

  const areMessageRegistered = await usecase.invoke()

  return responseMessage<{
    areMessageRegistered: UserModel[]
  }>({
    statusCode: StatusCodes.OPERATION_SUCCESSFULL,
    body: {
      areMessageRegistered
    }
  })
}