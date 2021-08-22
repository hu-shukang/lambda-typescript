import { EmailForm } from '../model/dto/email.dto'
import { sesClient } from '../utils/ses-client'
import { MessageUtil } from '../utils/message'
import { SendEmailCommand, SendEmailCommandInput } from '@aws-sdk/client-ses'

export class EmailsController {
  async send(event: any) {
    console.log('send called')
    const form: EmailForm = JSON.parse(event.body)
    const input: SendEmailCommandInput = {
      Destination: {
        CcAddresses: form.cc,
        ToAddresses: form.to,
        BccAddresses: form.bcc,
      },
      Message: {
        Body: {
          Html: {
            Charset: 'UTF-8',
            Data: form.text,
          },
        },
        Subject: {
          Charset: 'UTF-8',
          Data: form.subject,
        },
      },
      Source: form.from,
    }
    const command = new SendEmailCommand(input)
    try {
      const data = await sesClient.send(command)
      return MessageUtil.success(data)
    } catch (e: any) {
      return MessageUtil.error(500, e)
    }
  }
}
