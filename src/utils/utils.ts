import { APIGatewayProxyEventV2 } from "aws-lambda";

export const extractBody = (event: APIGatewayProxyEventV2) => {
  return event.body ? JSON.parse(event.body) : {}
}