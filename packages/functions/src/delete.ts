import AWS from "aws-sdk";
import { Table } from "sst/node/table";
import { APIGatewayProxyHandlerV2 } from "aws-lambda";

const dynamoDb = new AWS.DynamoDB.DocumentClient();

export const main: APIGatewayProxyHandlerV2 = async (event) => {

  const data = JSON.parse(event?.body || '');

  const params = {
    TableName: Table.FormTable.tableName,
    Key: {
        id: event?.pathParameters?.id,
        name: data?.name
    }
  };
  await dynamoDb.delete(params).promise();

  return {
    statusCode: 200,
    body: JSON.stringify({status: true}),
  };
}
