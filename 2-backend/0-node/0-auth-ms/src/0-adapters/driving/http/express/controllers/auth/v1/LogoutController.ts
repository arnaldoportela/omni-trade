import { Request, Response } from 'express';

import { Injectable } from '@crosscutting/ioc/InjectableDecorator';

import { AbstractLogoutController } from '../abstractions/v1/AbstractLogoutController';

@Injectable()
export class LogoutController extends AbstractLogoutController{
    public async post(req: Request, res: Response): Promise<Response> {
        return res.status(200).json({ message: "User logged out successfully" });
    }
}