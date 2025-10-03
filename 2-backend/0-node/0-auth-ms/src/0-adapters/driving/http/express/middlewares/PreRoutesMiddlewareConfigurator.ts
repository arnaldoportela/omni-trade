import { Express, Request, Response, NextFunction } from 'express';
import express from 'express';
import cors from 'cors';
import { SwaggerMiddleware } from './preRoutesMiddlewares/SwaggerMiddleware';
import { Injectable } from '@crosscutting/ioc/InjectableDecorator';

@Injectable()
export class PreRoutesMiddlewareConfigurator {
    public register(app: Express): void {
        app.use(express.json({ limit: '10mb' }));
        app.use(express.urlencoded({ limit: '10mb' }));
        app.use(express.static('public'));
        app.use((req: Request, res: Response, next: NextFunction) => {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
            res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
            next();
        })
        app.use(cors());
        app.use(new SwaggerMiddleware().setup());
    }
}