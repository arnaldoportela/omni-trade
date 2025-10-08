import { Request, Response } from 'express'; 

import { Injectable } from '@crosscutting/ioc/InjectableDecorator';

import { AbstractLoginController } from '../abstractions/v1/AbstractLoginController';
import { AbstractLoginUseCase } from '@application/auth/useCases/ports/AbstractLoginUsecase';
import { LoginInputDTO } from '@application/auth/dtos/input/LoginInputDto';

@Injectable()
export class LoginController extends AbstractLoginController{

    private readonly loginUseCase: AbstractLoginUseCase;

    constructor(_loginUseCase: AbstractLoginUseCase) { 
        super();
        this.loginUseCase = _loginUseCase;
    }

    public async post(req: Request, res: Response): Promise<Response> {

        const input: LoginInputDTO = {
            email: req.body.email,
            password: req.body.password,
            fingerprint: req.headers['user-agent'] ?? ''
        }

        const result = await this.loginUseCase.execute(input);

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