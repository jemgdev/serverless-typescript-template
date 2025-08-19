import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda'
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
  } catch (err) {
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
