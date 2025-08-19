import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda'
import { z } from 'zod'
import { CreateUser } from '@user/application/usecases/command/CreateUser'
import { InMemoryUserRepository } from '@user/infrastructure/driven/InMemoryUserRepository'
import { bodyParser } from '@shared/utils/parsers'
import { responseMessage } from '@shared/utils/response-message'
import { StatusCodes } from '@shared/utils/constants/StatusCodes'
import { MessageCodes } from '@shared/utils/constants/MessageCodes'
import { Messages } from '@shared/utils/constants/Messages'
import { UserHttpMapper } from '@user/application/mappers/UserHttpMapper'
import { ICreateUserHttpResponse } from '@user/application/dtos/ICreateUserHttpResponse'
import { Logger } from '@shared/libraries/logger/Logger'
import { CreateUserSchema } from '../../schemas/CreateUserSchema'
import { ValidationError } from '../../../../../shared/errors/ValidationError'
import { ApplicationError } from '../../../../../shared/errors/ApplicationError'
import { DomainError } from '../../../../../shared/errors/DomainError'
import { InfrastructureError } from '../../../../../shared/errors/InfrastructureError'

const logger = new Logger()
const userRepository = new InMemoryUserRepository()
const createUser = new CreateUser(userRepository, logger)

export const handler = async (
  event: APIGatewayProxyEventV2
): Promise<APIGatewayProxyResultV2> => {
  try {
    const body = bodyParser<{
      name: string
      lastname: string
      age: number
      identificationNumber: string
      identificationType: string
    }>(event)

    const parsed = CreateUserSchema.safeParse(body)

    if (!parsed.success) {
      const message = parsed.error.message
      throw new ValidationError([
        {
          field: 'any',
          message
        }
      ])
    }

    const user = UserHttpMapper.fromRequest({
      name: body.name,
      lastName: body.lastname,
      age: body.age,
      identificationNumber: body.identificationNumber,
      identificationType: body.identificationType
    })

    const userData = await createUser.execute(user)

    const response: ICreateUserHttpResponse = {
      id: userData.userId
    }

    return responseMessage<{
      code: string
      message: string
      data: ICreateUserHttpResponse
    }>({
      statusCode: StatusCodes.OPERATION_SUCCESSFUL,
      body: {
        code: MessageCodes.OPERATION_SUCCESSFUL,
        message: Messages.OPERATION_SUCCESSFUL,
        data: response
      }
    })
  } catch (error) {
    if (error instanceof ValidationError) {
      return responseMessage<{
        code: string
        message: string
        errors: Array<{
          field: string
          message: string
        }>
      }>({
        statusCode: StatusCodes.BAD_REQUEST,
        body: {
          code: MessageCodes.BAD_REQUEST,
          message: error.message,
          errors: error.errors
        }
      })
    }

    if (error instanceof DomainError) {
      return responseMessage<{
        code: string
        message: string
      }>({
        statusCode: StatusCodes.PROCESS_ERROR,
        body: {
          code: MessageCodes.PROCESS_ERROR,
          message: error.message
        }
      })
    }

    if (error instanceof ApplicationError) {
      return responseMessage<{
        code: string
        message: string
      }>({
        statusCode: error.statusCode,
        body: {
          code: MessageCodes.PROCESS_ERROR,
          message: error.message
        }
      })
    }

    if (error instanceof InfrastructureError) {
      return responseMessage<{
        code: string
        message: string
      }>({
        statusCode: error.statusCode,
        body: {
          code: MessageCodes.PROCESS_ERROR,
          message: error.message
        }
      })
    }

    return responseMessage<{
      code: string
      message: string
    }>({
      statusCode: StatusCodes.UNCONTROLLER_ERROR,
      body: {
        code: MessageCodes.UNCONTROLLER_ERROR,
        message: error instanceof Error ? error.message : Messages.UNCONTROLLER_ERROR
      }
    })
  }
}
