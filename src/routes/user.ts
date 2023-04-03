import { Request, Response, Router, NextFunction } from 'express';
import { requestUtils, enums } from '../utils'; 
import { verifyEmail, createUser, resendVerificationCode } from '../controllers';

const userRouter = Router();

userRouter.post('', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const filteredRequest = await requestUtils.filterRequest(req);
        const controllerResponse = await createUser(filteredRequest);
        res.status(enums.StatusCodes.CREATED).send(controllerResponse);    
    } catch(err) {
        next(err);
    }
});

userRouter.post('/login', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const filteredRequest = await requestUtils.filterRequest(req);
        const controllerResponse = await verifyEmail(filteredRequest);
        res.status(enums.StatusCodes.OK).send(controllerResponse);
    } catch(err) {
        next(err);
    }
});

userRouter.post('/otp/resend', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const filteredRequest = await requestUtils.filterRequest(req);
        const controllerResponse = await resendVerificationCode(filteredRequest);
        res.status(enums.StatusCodes.OK).send(controllerResponse);
    } catch(err) {
        next(err);
    }
});


export default userRouter;