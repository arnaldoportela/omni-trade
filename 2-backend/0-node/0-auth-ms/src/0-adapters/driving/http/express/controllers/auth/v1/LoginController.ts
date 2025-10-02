import { Request, Response } from 'express'; 

import { Injectable } from '../../../../../../../3-crosscutting/ioc/InjectableDecorator';

import { ILoginController } from '../abstractions/v1/ILoginController';
import { ILoginUseCase } from '../../../../../../../1-application/auth/useCases/ports/ILoginUsecase';
import { LoginInputDTO } from '../../../../../../../1-application/auth/dtos/input/LoginInputDto';

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
                domain: process.env.NODE_ENV === 'production' ? 'yourdomain.com' : 'localhost',
                maxAge: 24 * 60 * 60 * 1000 // 1 day
            })
            .json({ message: "Login successful" });
    }
}