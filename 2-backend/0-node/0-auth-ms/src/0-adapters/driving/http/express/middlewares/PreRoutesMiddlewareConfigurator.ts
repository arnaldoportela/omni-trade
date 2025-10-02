import { Request, Response, NextFunction, Router } from 'express';
import express from 'express';
import cors from 'cors';
import { SwaggerMiddleware } from './preRoutesMiddlewares/SwaggerMiddleware';
import { Injectable } from '@crosscutting/ioc/InjectableDecorator';

@Injectable()
export class PreRoutesMiddlewareConfigurator {
    public register(): Router {
        const router = Router();
        router.use(express.json({ limit: '10mb' }));
        router.use(express.urlencoded({ limit: '10mb' }));
        router.use(express.static('public'));
        router.use((req: Request, res: Response, next: NextFunction) => {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
            res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
            next();
        })
        router.use(cors());
        router.use(new SwaggerMiddleware().setup());

        return router;
    }
}