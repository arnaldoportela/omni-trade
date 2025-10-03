import { Express } from 'express';

import { errorHandlerMiddleware } from './postRoutesMiddlewares/ErrorHandler';
import { Injectable } from '@crosscutting/ioc/InjectableDecorator';

@Injectable()
export class PostRoutesMiddlewareConfigurator {
    public register(app: Express): void {
        app.use(errorHandlerMiddleware);
    }
}