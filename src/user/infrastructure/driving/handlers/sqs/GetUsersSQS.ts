import { SQSEvent, SQSBatchResponse } from 'aws-lambda'
import { Loggerfy } from 'loggerfy'
import { InMemoryUserRepository } from '../../../driven/InMemoryUserRepository'
import { GetAllUsers } from '../../../../application/usecases/query/GetAllUsers'
import { StatusCodes } from '../../../../../shared/utils/constants/status-codes'
import { responseMessage } from '../../../../../shared/utils/response-message'
import { sqsParser } from '../../../../../shared/utils/parsers'
import { User } from '../../../../domain/User'

export const handler = async (event: SQSEvent): Promise<SQSBatchResponse> => {
  const logger = new Loggerfy()
  logger
    .info()
    .setCode('handler')
    .setDetail('Event data')
    .setMessage('SQS event data')
    .setMetadata({
      event
    })
    .write()

  const failedMessageIds: string[] = []

  const payload = sqsParser<User>(event)

  await Promise.all(
    payload.map(async (data) => {
      try {
        const userRepository = new InMemoryUserRepository()
        const getAllUsers = new GetAllUsers(userRepository)

        const users = await getAllUsers.execute()
        const finalUsers = users.map(user => user.toPrimitives())
        return responseMessage<{
          areMessageRegistered: any[]
        }>({
          statusCode: StatusCodes.OPERATION_SUCCESSFUL,
          body: {
            areMessageRegistered: finalUsers
          }
        })
      } catch (error) {
        const err = error as Error

        logger
          .error()
          .setCode('logRegisterAdapter')
          .setDetail('Error in logRegisterAdapter')
          .setMessage('Have an error in logRegisterAdapter: 29')
          .setMetadata({
            message: err.message
          })
          .write()

        failedMessageIds.push(data.messageId)
      }
    })
  )

  return {
    batchItemFailures: failedMessageIds.map((messageId) => ({
      itemIdentifier: messageId
    }))
  }
}
