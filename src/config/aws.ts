import { SNSClient, PublishCommand } from '@aws-sdk/client-sns';
import { Environments, interfaces, enums, constants } from '../utils';
import { logger } from '../services';

const runAwsFile = () => {};

const snsClient = new SNSClient({ 
    credentials: {
        accessKeyId: Environments.aws.accessKeyId,
        secretAccessKey: Environments.aws.secretAccessKey,
    },
    region: Environments.aws.snsRegion
});

const sendOtp = async ({ userId, extension, number, otp }: interfaces.ISendOtpObj): Promise<boolean> => {
    try {
        const input = { 
            PhoneNumber: extension + ' ' + number,
            Message: constants.OTP_TEXT + otp,
        };
        const command = new PublishCommand(input);
        await snsClient.send(command);
        return true;
    } catch(error) {
        await logger('Auth Service: ' + 'For userId:' + userId + enums.PrefixesForLogs.AWS_SEND_OTP_ERROR + error?.toString());
    }
    return false;
}

export { snsClient, runAwsFile, sendOtp }