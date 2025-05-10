import { APIGatewayProxyEventV2 } from "aws-lambda";

/**
 * Extracts and parses the JSON body from an AWS API Gateway event.
 * @param {APIGatewayProxyEventV2} event - The API Gateway event containing the request details.
 * @returns {T} The parsed body as an object. Returns an empty object if the body is not present.
 */
export function bodyParser<T> (event: APIGatewayProxyEventV2): T {
  return event.body ? JSON.parse(event.body) as T : {} as T
}

/**
 * Extracts headers from an AWS API Gateway event.
 * @param {APIGatewayProxyEventV2} event - The API Gateway event containing the request details.
 * @returns {T} The headers as an object.
 */
export function headerParser<T> (event: APIGatewayProxyEventV2): T {
  return event.headers as T
}