import { Request, Response, Router, NextFunction } from 'express';
import { requestUtils, enums } from '../utils'; 
import { 
    login, createUser, resendOtp, authenticateRequest, authenticateSilentRequest, findNumber, getCities,
    logout, findEmail
} from '../controllers';

const userRouter = Router();

userRouter.get('/check', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const filteredRequest = await requestUtils.filterRequest(req);
        //const controllerResponse = await findNumber(filteredRequest);
        const controllerResponse = await findEmail(filteredRequest);
        res.status(enums.StatusCodes.OK).send(controllerResponse);
    } catch(err) {
        next(err);
    }
});

userRouter.get('/cities', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const filteredRequest = await requestUtils.filterRequest(req);
        const controllerResponse = await getCities(filteredRequest);
        res.status(enums.StatusCodes.OK).send(controllerResponse);
    } catch(err) {
        next(err);
    }
});

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
        const controllerResponse = await login(filteredRequest);
        res.status(enums.StatusCodes.OK).send(controllerResponse);
    } catch(err) {
        next(err);
    }
});

userRouter.post('/:userId/logout', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const filteredRequest = await requestUtils.filterRequest(req);
        const controllerResponse = await logout(filteredRequest);
        res.status(enums.StatusCodes.OK).send(controllerResponse);    
    } catch(err) {
        next(err);
    }
});

userRouter.post('/otp/resend', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const filteredRequest = await requestUtils.filterRequest(req);
        const controllerResponse = await resendOtp(filteredRequest);
        res.status(enums.StatusCodes.OK).send(controllerResponse);
    } catch(err) {
        next(err);
    }
});

userRouter.post('/auth', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const filteredRequest = await requestUtils.filterRequest(req);
        const controllerResponse = await authenticateRequest(filteredRequest);
        res.status(enums.StatusCodes.OK).send(controllerResponse);
    } catch(err) {
        next(err);
    }
});

userRouter.post('/auth/silent', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const filteredRequest = await requestUtils.filterRequest(req);
        const controllerResponse = await authenticateSilentRequest(filteredRequest);
        res.status(enums.StatusCodes.OK).send(controllerResponse);
    } catch(err) {
        next(err);
    }
});

export default userRouter;