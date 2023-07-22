import { SESClient } from '@aws-sdk/client-ses';
import { Environments } from '../utils';

const getEmailClient = () => {
    try {
        const ses = new SESClient({ 
            credentials: {
                accessKeyId: Environments.aws.accessKeyId,
                secretAccessKey: Environments.aws.secretAccessKey,
                
            },
            region: Environments.aws.region,
            apiVersion: Environments.aws.sesApiVersion
        });
        return ses;
    } catch(err) {
        console.error(err);
    }
}

export { getEmailClient }