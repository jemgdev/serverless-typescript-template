import { SQSEvent, SQSBatchResponse } from 'aws-lambda'
import { Loggerfy } from 'loggerfy'
import { UserModel } from '../core/domain/models/user.model'
import { GetUsersUseCase } from '../core/usecases/get-users.usecase'
import { UserMemoryRepository } from '../core/infrastructure/repositories/user.memory.repository'
import { getUsersSqsAdapter } from '../adapters/get-users-sqs.adapter'
import { sqsParser } from '../utils/parsers'

const logger = new Loggerfy()
const userRepository = new UserMemoryRepository()
const getUsersUseCase = new GetUsersUseCase(userRepository)

export const handler = async (event: SQSEvent): Promise<SQSBatchResponse> => {
  logger
    .info()
    .setCode('handler')
    .setDetail('Event data')
    .setMessage('SQS event data')
    .setMetadata({
      event,
    })
    .write()

  const failedMessageIds: string[] = []

  const payload = sqsParser<UserModel>(event)

  await Promise.all(
    payload.map(async (data) => {
      try {
        const response = await getUsersSqsAdapter(getUsersUseCase, data.body)

        return response
      } catch (error) {
        const err = error as Error

        logger
          .error()
          .setCode('logRegisterAdapter')
          .setDetail('Error in logRegisterAdapter')
          .setMessage('Have an error in logRegisterAdapter: 29')
          .setMetadata({
            message: err.message,
          })
          .write()

        failedMessageIds.push(data.messageId)
      }
    }),
  )

  return {
    batchItemFailures: failedMessageIds.map((messageId) => ({
      itemIdentifier: messageId,
    })),
  }
}
