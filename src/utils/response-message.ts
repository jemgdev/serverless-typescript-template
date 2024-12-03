import { APIGatewayProxyResultV2 } from 'aws-lambda'

export const responseMessage = ({
    statusCode,
    body
  }: {
    statusCode: number
    body?: any
  }): APIGatewayProxyResultV2 => {
  return {
    headers: {
      'Content-Type': 'application/json'
    },
    statusCode,
    body: body ? JSON.stringify(body) : undefined
  }
}