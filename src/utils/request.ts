import { Request } from 'express';
import { IRequestObject } from './interfaces';
import { interfaces } from 'utils';

const filterRequest = async (req: interfaces.ICustomerRequest) => {
    const httpRequest: IRequestObject = {
        body: req.body,
        path: req.path,
        params: req.params,
        query: req.query,
        method: req.method,
        headers: req.headers,
        user: req.user
    };
    return httpRequest;
}

export { filterRequest };
