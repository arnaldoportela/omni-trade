import { Request, Response } from 'express';

import { Injectable } from '@crosscutting/ioc/InjectableDecorator';

import { AbstractValidateController } from '../abstractions/v1/AbstractValidateController';

@Injectable()
export class ValidateController extends AbstractValidateController{
    public async post(req: Request, res: Response): Promise<Response> {
        return res.status(200).json({ message: "Token is valid" });
    };
}