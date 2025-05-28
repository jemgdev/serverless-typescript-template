import { handler } from '@handlers/get-users'
import { getUsersHttpAdapter } from '@adapters/get-users.adapter'
import { StatusCodes } from '@utils/constants/status-codes'
import { MessageCodes } from "@utils/constants/message-codes"
import { Messages } from "@utils/constants/messages"

jest.mock('@adapters/get-users.adapter')

describe('handler - getUsers', () => {
  const mockResponse = {
    statusCode: StatusCodes.OPERATION_SUCCESSFULL,
    body: [{ id: '1', username: 'test-user' }],
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should return successful response from getUsersHttpAdapter', async () => {
    (getUsersHttpAdapter as jest.Mock).mockResolvedValue(mockResponse)

    const result = await handler()

    expect(getUsersHttpAdapter).toHaveBeenCalled()
    expect(result).toEqual(mockResponse)
  })

  it('should return error response if getUsersHttpAdapter throws', async () => {
    (getUsersHttpAdapter as jest.Mock).mockRejectedValue(new Error('Boom'))

    const result = await handler()

    expect(result).toEqual({
      statusCode: StatusCodes.UNCONTROLLER_ERROR,
      body: JSON.stringify({
        code: MessageCodes.UNCONTROLLER_ERROR,
        message: Messages.UNCONTROLLER_ERROR
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
  })
})
