import { APIGatewayProxyEventV2 } from 'aws-lambda'
import { responseMessage } from "../../utils/response-message"
import { StatusCodes } from '../../utils/constants/status-codes'
import { getUsersHttpAdapter } from '../adapters/get-users.adapter'

export const handler = async (event: APIGatewayProxyEventV2) => {
  try {
    const response = await getUsersHttpAdapter(event)
    return response
  } catch (error: any) {
    return responseMessage({
      statusCode: StatusCodes.UNCONTROLLER_ERROR
    })
  }
}
