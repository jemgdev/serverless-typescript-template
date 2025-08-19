import { SQSEvent, SQSBatchResponse } from 'aws-lambda'
import { InMemoryUserRepository } from '@user/infrastructure/driven/InMemoryUserRepository'
import { GetAllUsers } from '@user/application/usecases/query/GetAllUsers'
import { StatusCodes } from '@shared/utils/constants/StatusCodes'
import { responseMessage } from '@shared/utils/ResponseMessage'
import { sqsParser } from '@shared/utils/parsers'
import { User } from '@user/domain/User'
import { Logger } from '@shared/libraries/logger/Logger'

const logger = new Logger()

export const handler = async (event: SQSEvent): Promise<SQSBatchResponse> => {
  logger.info('Sqs event data', 'GET_USERS_SQS', 'Sqs event data', {
    event
  })

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

        logger.error('SQS event error', 'GET_USERS', 'SQS event error', {
          message: err.message
        })

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
