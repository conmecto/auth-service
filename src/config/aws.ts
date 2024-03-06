//import { SNSClient, PublishCommand } from '@aws-sdk/client-sns';
import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';
import { Environments, interfaces, enums, constants } from '../utils';
import { logger } from '../services';

const runAwsFile = () => {};

const sesClient = new SESClient({
    credentials: { 
        accessKeyId: Environments.aws.accessKeyId,
        secretAccessKey: Environments.aws.secretAccessKey,
    },
    region: Environments.aws.sesRegion
});

const sendEmail = async ({ userId, email, otp }: interfaces.ISendEmailObj) => {
    try {
        const input = {
            Source: Environments.email,
            Destination: {
                ToAddresses: [email]
            },
            Message: {
                Subject: {
                  Data: 'Conmecto OTP for login',
                  Charset: 'UTF-8',
                },
                Body: {
                  Text: {
                    Data: constants.OTP_TEXT + otp,
                    Charset: 'UTF-8'
                  }
                },
            },
        }
        const command = new SendEmailCommand(input);
        const response = await sesClient.send(command);
        if (response.MessageId) {
            return true;
        }
    } catch(error) {
        await logger('Auth Service: ' + 'For userId:' + userId + enums.PrefixesForLogs.AWS_SEND_OTP_ERROR + error?.toString());
    }
    return false;
}

// const snsClient = new SNSClient({ 
//     credentials: {
//         accessKeyId: Environments.aws.accessKeyId,
//         secretAccessKey: Environments.aws.secretAccessKey,
//     },
//     region: Environments.aws.snsRegion
// });

// const sendOtp = async ({ userId, extension, number, otp }: interfaces.ISendOtpObj): Promise<boolean> => {
//     try {
//         const input = { 
//             PhoneNumber: extension + ' ' + number,
//             Message: constants.OTP_TEXT + otp,
//         };
//         const command = new PublishCommand(input);
//         await snsClient.send(command);
//         return true;
//     } catch(error) {
//         await logger('Auth Service: ' + 'For userId:' + userId + enums.PrefixesForLogs.AWS_SEND_OTP_ERROR + error?.toString());
//     }
//     return false;
// }

export { sesClient, runAwsFile, sendEmail }