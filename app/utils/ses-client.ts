import { SESClient } from '@aws-sdk/client-ses'

const REGION = 'ap-northeast-1'

export const sesClient = new SESClient({
  region: REGION,
})
