import { APIGatewayProxyResultV2 } from 'aws-lambda';
export declare const responseMessage: ({ statusCode, body }: {
    statusCode: number;
    body?: any;
}) => APIGatewayProxyResultV2;
