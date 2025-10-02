import { Request, Response } from 'express';

import { Injectable } from '../../../../../../../3-crosscutting/ioc/InjectableDecorator';

import { IValidateController } from '../abstractions/v1/IValidateController';

@Injectable()
export class ValidateController extends IValidateController{
    public async post(req: Request, res: Response): Promise<Response> {
        return res.status(200).json({ message: "Token is valid" });
    };
}