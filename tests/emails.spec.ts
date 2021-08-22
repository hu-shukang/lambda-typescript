import { sendEmail } from '../app/handler'
import lambdaTester from 'lambda-tester'

describe('emails', () => {
  it('sendEmail', (done) => {
    lambdaTester(sendEmail)
      .event({
        body: JSON.stringify({
          from: 'hushukang@bt-hsk.com',
          text: 'hello, this is a test email',
          subject: 'test email',
          to: ['hsk287416ss@yahoo.co.jp'],
          cc: [],
          bcc: [],
        }),
      })
      .expectResult((result: any) => {
        console.log(result)
        done()
      })
  })
})
