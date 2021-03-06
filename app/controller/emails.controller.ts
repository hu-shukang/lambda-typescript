import { EmailForm } from '../model/dto/email.dto'
import { sesClient } from '../utils/clients'
import { SendTemplatedEmailCommand, SendTemplatedEmailCommandInput } from '@aws-sdk/client-ses'

export class EmailsController {
  async send(event: any) {
    console.log('send called')
    event.Records.forEach((record: any) => {
      console.log('eventName:', record.eventName)
      console.log('DynamoDB Record: %j', record.dynamodb)

      if (record.eventName == 'INSERT') {
        const newItem = record.dynamodb.NewImage
        console.log(newItem)
        const form: EmailForm = {
          to: ['xxxx@gmail.com'],
          name: 'xxxx',
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
          Source: 'xxx@xxx.com',
        }
        const command = new SendTemplatedEmailCommand(input)
        sesClient
          .send(command)
          .then((resp: any) => {
            console.log(resp)
          })
          .catch((error: any) => {
            console.log(error)
          })
          .finally(() => {
            console.log('send email finally')
          })
      }
    })
  }
}
