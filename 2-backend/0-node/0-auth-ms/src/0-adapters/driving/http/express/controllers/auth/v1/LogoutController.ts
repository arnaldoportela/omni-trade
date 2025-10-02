import { Request, Response } from 'express';

import { Injectable } from '../../../../../../../3-crosscutting/ioc/InjectableDecorator';

import { ILogoutController } from '../abstractions/v1/ILogoutController';

@Injectable()
export class LogoutController extends ILogoutController{
    public async post(req: Request, res: Response): Promise<Response> {
        return res.status(200).json({ message: "User logged out successfully" });
    }
}