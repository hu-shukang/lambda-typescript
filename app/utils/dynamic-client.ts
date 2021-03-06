import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
// Set the AWS Region.
const REGION = 'ap-northeast-1'

// Create an Amazon DynamoDB service client object.
export const ddbClient = new DynamoDBClient({ region: REGION })
