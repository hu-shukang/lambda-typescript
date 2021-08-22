export interface EmailForm {
  from: string
  text: string
  subject: string
  to: string[]
  cc: string[]
  bcc: string[]
}
