import { APIGatewayProxyEventV2 } from "aws-lambda";
export declare function bodyParser<T>(event: APIGatewayProxyEventV2): T;
export declare function headerParser<T>(event: APIGatewayProxyEventV2): T;
