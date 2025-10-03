import { Request, Response } from 'express'; 

import { Injectable } from '@crosscutting/ioc/InjectableDecorator';

import { ILoginController } from '../abstractions/v1/ILoginController';
import { ILoginUseCase } from '@application/auth/useCases/ports/ILoginUsecase';
import { LoginInputDTO } from '@application/auth/dtos/input/LoginInputDto';

@Injectable()
export class LoginController extends ILoginController{

    constructor(private _loginUseCase: ILoginUseCase) { 
        super();
    }

    public async post(req: Request, res: Response): Promise<Response> {

        const input: LoginInputDTO ={
            email: req.body.email,
            password: req.body.password
        }

        const result = await this._loginUseCase.execute(input);

        return res.status(200)
            .cookie("sessionId", result.sessionId, { 
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                domain: process.env.NODE_ENV === 'production' ? 'omnitrade.com' : 'localhost',
                maxAge: 24 * 60 * 60 * 1000
            })
            .json({ message: "Login successful" });
    }
}