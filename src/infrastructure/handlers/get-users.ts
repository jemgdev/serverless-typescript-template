import { responseMessage } from "@utils/response-message"
import { StatusCodes } from '@utils/constants/status-codes'
import { getUsersHttpAdapter } from '@infrastructure/adapters/get-users.adapter'

export const handler = async () => {
  try {
    const response = await getUsersHttpAdapter()
    return response
  } catch (error) {
    return responseMessage({
      statusCode: StatusCodes.UNCONTROLLER_ERROR
    })
  }
}
