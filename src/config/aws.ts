import { SES } from 'aws-sdk';
import { Agent } from 'http';
import { Environments } from '../utils';

const getEmailObj = () => {
    try {
        const agent = new Agent({
            keepAlive: true,
            maxSockets: 25
        });

        const ses = new SES({ 
            httpOptions: {
                agent
            },
            credentials: {
                accessKeyId: Environments.aws.accessKeyId,
                secretAccessKey: Environments.aws.secretAccessKey,
            },
            apiVersion: Environments.aws.sesApiVersion
        });
        return ses;
    } catch(err) {
        console.error(err);
    }
 }

export { getEmailObj }