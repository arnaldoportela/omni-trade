import { Router } from 'express';

import { errorHandlerMiddleware } from './postRoutesMiddlewares/ErrorHandler';
import { Injectable } from '@crosscutting/ioc/InjectableDecorator';

@Injectable()
export class PostRoutesMiddlewareConfigurator {
    public register(): Router {
        const router = Router();
        router.use(errorHandlerMiddleware);

        return router;
    }
}