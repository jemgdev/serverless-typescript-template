import { jest } from '@jest/globals';
import { SQSEvent } from 'aws-lambda'
import { handler } from '../../src/handlers/get-users-sqs'
import { StatusCodes } from '../../src/utils/constants/status-codes'
import { getUsersSqsAdapter } from '../../src/adapters/get-users-sqs.adapter'

jest.mock('../../src/adapters/get-users-sqs.adapter')

describe('getUsersSqs', () => {
  const mockResponse = {
    statusCode: StatusCodes.OPERATION_SUCCESSFUL,
    body: [{ id: '1', username: 'test-user' }],
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('Should return OPERATION_SUCCESSFULL', async () => {
    (getUsersSqsAdapter as jest.Mock).mockResolvedValue(mockResponse as never)

    const event: SQSEvent = {
      Records: [
        {
          messageId: '1',
          receiptHandle: 'handle1',
          body: JSON.stringify({ message: 'test' }),
          // @ts-expect-error only for testing purposes
          attributes: {},
          messageAttributes: {},
          md5OfBody: 'md5',
          eventSource: 'aws:sqs',
          eventSourceARN: 'arn:aws:sqs:region:account-id:queue-name',
          awsRegion: 'us-east-1',
        },
      ],
    }

    const response = await handler(event)

    expect(response.batchItemFailures).toStrictEqual([])
  })

  it('Should return UNCONTROLLER_ERROR', async () => {
    (getUsersSqsAdapter as jest.Mock).mockRejectedValue(new Error('Boom') as never)

    const event: SQSEvent = {
      Records: [
        {
          messageId: '1',
          receiptHandle: 'handle1',
          body: JSON.stringify({ message: 'test' }),
          // @ts-expect-error only for testing purposes
          attributes: {},
          messageAttributes: {},
          md5OfBody: 'md5',
          eventSource: 'aws:sqs',
          eventSourceARN: 'arn:aws:sqs:region:account-id:queue-name',
          awsRegion: 'us-east-1',
        },
      ],
    }

    const response = await handler(event)

    expect(response.batchItemFailures).toStrictEqual([
      {
        itemIdentifier: '1',
      },
    ])
  })
})
