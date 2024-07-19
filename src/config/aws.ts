import { SNSClient, CreatePlatformEndpointCommand, PublishCommand, ListPlatformApplicationsCommand } from '@aws-sdk/client-sns';
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
    } catch(error: any) {
        const errorString = JSON.stringify({
            stack: error?.stack,
            message: error?.toString()
        });
        await logger('For userId:' + userId + enums.PrefixesForLogs.AWS_SEND_OTP_ERROR + errorString);
    }
    return false;
}

const snsClient = new SNSClient({ 
    credentials: {
        accessKeyId: Environments.aws.accessKeyId,
        secretAccessKey: Environments.aws.secretAccessKey,
    },
    region: Environments.aws.snsRegion
});

const createUserNotificationEndPoint = async ({ userId, deviceToken }: interfaces.ICreateUserNotificationEndPoint) => {
    try {
        let appleIosArn: string | undefined;
        const command = new ListPlatformApplicationsCommand({});
        const res = await snsClient.send(command);
        if (res?.PlatformApplications?.length && Environments.env === 'prod') {
            appleIosArn = res.PlatformApplications.find(application => !application.PlatformApplicationArn?.includes('SANDBOX'))?.PlatformApplicationArn;
        } else if (res?.PlatformApplications?.length) {
            appleIosArn = res.PlatformApplications.find(application => application.PlatformApplicationArn?.includes('SANDBOX'))?.PlatformApplicationArn;
        } 
        if (!appleIosArn) {
            throw new Error('Platform application arn not found')
        }
        const input = {
            PlatformApplicationArn: appleIosArn,
            Token: deviceToken,
            CustomUserData: userId?.toString()
        }
        const createCommand = new CreatePlatformEndpointCommand(input);
        const createRes = await snsClient.send(createCommand);
        return createRes?.EndpointArn;
    } catch(error: any){
        const errorString = JSON.stringify({
            stack: error?.stack,
            message: error?.toString()
        });
        await logger('For userId:' + userId + enums.PrefixesForLogs.AWS_SNS_CREATE_PLATFORM_ENDPOINT_ERROR + errorString);
    }
}

const sendPushNotification = async ({ userId, message, deviceEndpoint }: interfaces.ISendPushNotification) => {
    try {
        const input = {
            TargetArn: deviceEndpoint,
            Message: message
        }
        const command = new PublishCommand(input);
        await snsClient.send(command);
    } catch(error: any) {
        const errorString = JSON.stringify({
            stack: error?.stack,
            message: error?.toString()
        });
        await logger('For userId:' + userId + enums.PrefixesForLogs.AWS_SNS_PUSH_NOTIFICATION_ERROR + errorString);
    }
}

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
//         await logger('For userId:' + userId + enums.PrefixesForLogs.AWS_SEND_OTP_ERROR + error?.toString());
//     }
//     return false;
// }

export { runAwsFile, sendEmail, createUserNotificationEndPoint, sendPushNotification }