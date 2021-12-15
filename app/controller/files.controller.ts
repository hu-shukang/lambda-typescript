import { MessageUtil } from '../utils/message'
import * as multipart from 'aws-lambda-multipart-parser'
import { PutObjectCommand, PutObjectCommandInput } from '@aws-sdk/client-s3'
import { s3Client } from '../utils/clients'

export class FilesController {
  async add(event: any) {
    const body = multipart.parse(event, true)
    console.log(body)
    const file = body.file
    const params: PutObjectCommandInput = {
      Bucket: 'lambda-typescript-bucket',
      Key: file.filename,
      Body: file.content,
    }

    const resp = await s3Client.send(new PutObjectCommand(params))
    console.log(resp)

    return MessageUtil.success({
      message: 'file add called',
    })
  }
}
