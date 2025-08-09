import { APIGatewayProxyEventV2, SQSEvent } from 'aws-lambda'
import { queryParser, bodyParser, headerParser, sqsParser } from '../../src/utils/parsers'

describe('queryParser', () => {
  it('should parse query string parameters correctly', () => {
    const event = {
      queryStringParameters: {
        name: 'user',
        age: '30',
      } as unknown,
    } as APIGatewayProxyEventV2

    const result = queryParser<{ name: string; age: string }>(event)
    expect(result).toEqual({ name: 'user', age: '30' })
  })

  it('should return empty object if query string is undefined', () => {
    const event = {
      queryStringParameters: undefined,
    } as APIGatewayProxyEventV2

    const result = queryParser<{ anything?: string }>(event)
    expect(result).toEqual({})
  })
})

describe('bodyParser', () => {
  it('should parse JSON body correctly', () => {
    const event = {
      body: JSON.stringify({ name: 'Josupe', age: 30 }),
    } as APIGatewayProxyEventV2

    const result = bodyParser<{ name: string; age: number }>(event)
    expect(result).toEqual({ name: 'Josupe', age: 30 })
  })

  it('should return empty object if body is undefined', () => {
    const event = {
      body: undefined,
    } as APIGatewayProxyEventV2

    const result = bodyParser<{ anything?: string }>(event)
    expect(result).toEqual({})
  })
})

describe('headerParser', () => {
  it('should return headers as typed object', () => {
    // @ts-expect-error only for testing purposes, we are using a type assertion here
    const event = {
      headers: {
        'x-api-key': '12345',
        authorization: 'Bearer token',
      },
    } as APIGatewayProxyEventV2

    const result = headerParser<{ 'x-api-key': string; authorization: string }>(
      event,
    )
    expect(result).toEqual({
      'x-api-key': '12345',
      authorization: 'Bearer token',
    })
  })
})

describe('sqsParser', () => {
  it('should parse multiple records from SQS event', () => {
    const event = {
      Records: [
        {
          messageId: '1',
          body: JSON.stringify({ id: 1, value: 'foo' }),
        },
        {
          messageId: '2',
          body: JSON.stringify({ id: 2, value: 'bar' }),
        },
      ],
    } as unknown as SQSEvent

    const result = sqsParser<{ id: number; value: string }>(event)
    expect(result).toEqual([
      { messageId: '1', body: { id: 1, value: 'foo' } },
      { messageId: '2', body: { id: 2, value: 'bar' } },
    ])
  })
})
