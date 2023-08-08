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
      const response = await snsClient.send(
        new PublishCommand({
          Message: message,
          // One of PhoneNumber, TopicArn, or TargetArn must be specified.
          PhoneNumber: phoneNumber,
        })
      );
      console.log(response)
    } catch (err) {
      console.log('-errror--------------------')
      console.log(err)
    }

  }
}