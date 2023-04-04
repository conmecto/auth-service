import { emailObj } from '../config';

const sendEmail = async (
    sender: string,
    receiver: string,
    subject: string,
    text: string
): Promise<boolean> => {
    return new Promise((resolve, reject) => {
        const params = {
            Source: sender,
            Destination: {
                ToAddresses: [receiver]
            },
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
        };
        emailObj?.sendEmail(params, (err, data) => {
            if (err) {
                console.error(err);
                reject(false);
            }
            console.log(data.MessageId);
            resolve(true);
        });
    });
}

export default sendEmail;