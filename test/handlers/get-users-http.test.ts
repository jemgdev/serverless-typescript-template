import { jest } from '@jest/globals';
import { APIGatewayProxyEventV2 } from 'aws-lambda'
import { handler } from '../../src/handlers/get-users-http'
import { getUsersHttpAdapter } from '../../src/adapters/get-users-http.adapter'
import { StatusCodes } from '../../src/utils/constants/status-codes'
import { MessageCodes } from '../../src/utils/constants/message-codes'
import { Messages } from '../../src/utils/constants/messages'

jest.mock('../../src/adapters/get-users-http.adapter')

describe('getUsersHttp', () => {
  const mockResponse = {
    statusCode: StatusCodes.OPERATION_SUCCESSFULL,
    body: [{ id: '1', username: 'test-user' }],
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should return successful response from getUsersHttpAdapter', async () => {
    ; (getUsersHttpAdapter as jest.Mock).mockResolvedValue(mockResponse as never)

    // @ts-expect-error only for testing purposes
    const event: APIGatewayProxyEventV2 = {
      headers: {},
      body: JSON.stringify({}),
    }

    const result = await handler(event)

    expect(getUsersHttpAdapter).toHaveBeenCalled()
    expect(result).toEqual(mockResponse)
  })

  it('should return error response if getUsersHttpAdapter throws', async () => {
    ; (getUsersHttpAdapter as jest.Mock).mockRejectedValue(new Error('Boom') as never)

    // @ts-expect-error only for testing purposes
    const event: APIGatewayProxyEventV2 = {
      headers: {},
      body: JSON.stringify({}),
    }

    const result = await handler(event)

    expect(result).toEqual({
      statusCode: StatusCodes.UNCONTROLLER_ERROR,
      body: JSON.stringify({
        code: MessageCodes.UNCONTROLLER_ERROR,
        message: Messages.UNCONTROLLER_ERROR,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
  })
})
