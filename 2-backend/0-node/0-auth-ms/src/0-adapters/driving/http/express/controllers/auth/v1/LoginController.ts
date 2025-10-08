import { Request, Response } from 'express';

import { Injectable } from '@crosscutting/ioc/InjectableDecorator';

import { AbstractLoginController } from '../abstractions/v1/AbstractLoginController';
import { AbstractLoginUseCase } from '@application/auth/useCases/ports/AbstractLoginUsecase';
import { LoginInputDTO } from '@application/auth/dtos/input/LoginInputDto';
import { CookieOptionsBuilder } from '../../../utils/CookieOptionsBuilder';

@Injectable()
export class LoginController extends AbstractLoginController {

    private readonly loginUseCase: AbstractLoginUseCase;
    private readonly cookieBuilder: CookieOptionsBuilder;

    constructor(
        _loginUseCase: AbstractLoginUseCase,
        _cookieBuilder: CookieOptionsBuilder
    ) {
        super();
        this.loginUseCase = _loginUseCase;
        this.cookieBuilder = _cookieBuilder;
    }

    public async post(req: Request, res: Response): Promise<Response> {

        const input: LoginInputDTO = {
            email: req.body.email,
            password: req.body.password,
            userAgent: req.headers['user-agent'] ?? ''
        }

        const result = await this.loginUseCase.execute(input);

        return res.status(200)
            .cookie(
                "sessionId",
                result.sessionId,
                this.cookieBuilder.build())
            .json({ message: "Login successful" });
    }
}