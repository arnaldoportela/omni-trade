import { Request, Response } from 'express';

import { Injectable } from '@crosscutting/ioc/InjectableDecorator';

import { AbstractChangePasswordController } from '../abstractions/v1/AbstractChangePasswordController';
import { AbstractChangePasswordUseCase } from '@application/auth/useCases/ports/AbstractChangePasswordUsecase';
import { ChangePasswordInputDto } from '@application/auth/dtos/input/ChangePasswordInputDto';

@Injectable()
export class ChangePasswordController extends AbstractChangePasswordController {

    private readonly changePasswordUseCase: AbstractChangePasswordUseCase;

    constructor(_changePasswordUseCase: AbstractChangePasswordUseCase) {
        super();
        this.changePasswordUseCase = _changePasswordUseCase;
    }

    public async post(req: Request, res: Response): Promise<Response> {

        const input: ChangePasswordInputDto = {
            email: req.body.email,
            password: req.body.password,
            newPassword: req.body.newPassword
        }

        await this.changePasswordUseCase.execute(input);

        return res.status(200)
            .json({ message: "Password changed syccessfully" });
    }
}