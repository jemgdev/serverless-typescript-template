import { APIGatewayProxyEventV2 } from 'aws-lambda'
import { responseMessage } from "../utils/response-message"
import { StatusCodes } from '../constants/status-codes'
import { getUsersHttpAdapter } from '../infrastructure/driving/get-users.adapter'
import { Messages } from '../constants/messages'

export const handler = async (event: APIGatewayProxyEventV2) => {
  try {
    const usersFound = await getUsersHttpAdapter(event)
    return responseMessage({
      statusCode: StatusCodes.OPERATION_SUCCESSFUL,
      body: usersFound
    })
  } catch (error: any) {
    if (error.message === Messages.SERVICE_UNAVAILABLE) {
      return responseMessage({
        statusCode: StatusCodes.SERVICE_NOT_AVAILABLE
      })
    }

    return responseMessage({
      statusCode: StatusCodes.UNCONTROLLER_ERROR
    })
  }
}
