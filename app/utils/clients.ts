import { SESClient } from '@aws-sdk/client-ses'
import { S3Client } from '@aws-sdk/client-s3'

const REGION = 'ap-northeast-1'

export const sesClient = new SESClient({
  region: REGION,
})

export const s3Client = new S3Client({
  region: REGION,
})
