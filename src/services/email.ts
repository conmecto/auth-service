import { SendEmailCommand } from '@aws-sdk/client-ses';
import { emailClient } from '../config';
import { enums } from '../utils';

const sendEmail = async (
    sender: string,
    receiver: string,
    subject: string,
    text: string
): Promise<boolean> => {
    const email = new SendEmailCommand({
        Destination: {
            ToAddresses: [receiver]
        },
        Source: sender,
        Message: {
            Body: {
                Text: {
                    Charset: 'UTF-8', 
                    Data: text
                }
            }, 
            Subject: {
                Charset: 'UTF-8',
                Data: subject
            }
        }
    });
    let res: string | undefined = '';
    try {
        const sendEmailResponse = await emailClient?.send(email);
        res = sendEmailResponse?.MessageId;
    } catch(err) {
        console.error(enums.PrefixesForLogs.EMAIL_SEND_ERROR + err);
    }
    return Boolean(res);
}

export default sendEmail;