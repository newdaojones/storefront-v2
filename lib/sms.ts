import { SNSClient, PublishCommand } from "@aws-sdk/client-sns";

const snsClient = new SNSClient({
  region: 'us-east-1'
})

export class SmsService {
  static getInstance() {
    return new SmsService()
  }

  async send(phoneNumber: string, message: string) {
    try {
      console.log('sms start--------------------')
      console.log(phoneNumber)
      console.log(message)
      const response = await snsClient.send(
        new PublishCommand({
          Message: message,
          // One of PhoneNumber, TopicArn, or TargetArn must be specified.
          PhoneNumber: phoneNumber,
        })
      );
      console.log('sms sent---------------------')
      console.log(response)
    } catch (err) {
      console.log('sms error--------------------')
      console.log(err)
    }
  }
}