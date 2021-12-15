import { EmailForm } from '../model/dto/email.dto'
import { sesClient } from '../utils/clients'
import { SendTemplatedEmailCommand, SendTemplatedEmailCommandInput } from '@aws-sdk/client-ses'

export class EmailsController {
  async send(event: any) {
    console.log('send called')
    event.Records.forEach((record: any) => {
      console.log('イベント種別:', record.eventName)
      console.log('DynamoDB Record: %j', record.dynamodb)

      if (record.eventName == 'INSERT') {
        //項目が追加された時の処理
        const newItem = record.dynamodb.NewImage
        console.log(newItem)
      }
    })
    const form: EmailForm = {
      to: ['hushukang@gmail.com'],
      name: 'HU SHUKANG',
      favoriteanimal: 'Hello',
    }
    const input: SendTemplatedEmailCommandInput = {
      Destination: {
        CcAddresses: form.cc,
        ToAddresses: form.to,
        BccAddresses: form.bcc,
      },
      Template: 'Temp01',
      TemplateData: `{ "name": "${form.name}", "favoriteanimal": "${form.favoriteanimal}" }`,
      Source: 'hu.manager@bt-hsk.com',
    }
    const command = new SendTemplatedEmailCommand(input)
    const resp = await sesClient.send(command)
    console.log('email send response: ')
    console.log(resp)
  }
}
