import { APIGatewayProxyEventV2, SQSEvent } from 'aws-lambda'

/**
 * Extracts headers from an AWS API Gateway event.
 * @param {APIGatewayProxyEventV2} event - The API Gateway event containing the request details.
 * @returns {T} The headers as an object.
 */
export function queryParser<T>(event: APIGatewayProxyEventV2): T {
  return event.queryStringParameters ? (event.queryStringParameters as T) : ({} as T)
}

/**
 * Extracts and parses the JSON body from an AWS API Gateway event.
 * @param {APIGatewayProxyEventV2} event - The API Gateway event containing the request details.
 * @returns {T} The parsed body as an object. Returns an empty object if the body is not present.
 */
export function bodyParser<T>(event: APIGatewayProxyEventV2): T {
  return event.body ? (JSON.parse(event.body) as T) : ({} as T)
}

/**
 * Extracts headers from an AWS API Gateway event.
 * @param {APIGatewayProxyEventV2} event - The API Gateway event containing the request details.
 * @returns {T} The headers as an object.
 */
export function headerParser<T>(event: APIGatewayProxyEventV2): T {
  return event.headers as T
}

/**
 * Extracts and parses the JSON body from an AWS SQS event.
 * @param {SQSEvent} event - The SQS event containing the request details.
 * @returns {T[]} The parsed body as an array of object.
 */
export function sqsParser<T>(
  event: SQSEvent
): { messageId: string; body: T }[] {
  const records = event.Records
  const messages = records.map((record) => {
    return {
      messageId: record.messageId,
      body: JSON.parse(record.body) as T
    }
  })

  return messages
}
