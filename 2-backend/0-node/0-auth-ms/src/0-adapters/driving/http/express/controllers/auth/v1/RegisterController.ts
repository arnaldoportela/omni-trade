import { Request, Response } from "express";

import { RegisterInputDTO } from "@application/auth/dtos/input/RegisterInputDto";
import { AbstractRegisterUseCase } from "@application/auth/useCases/ports/AbstractRegisterUsecase";

import { Injectable } from "@crosscutting/ioc/InjectableDecorator";

import { AbstractRegisterController } from "../abstractions/v1/AbstractRegisterController";

@Injectable()
export class RegisterController extends AbstractRegisterController {

    private readonly registerUseCase: AbstractRegisterUseCase;
 
    constructor(_registerUseCase: AbstractRegisterUseCase) {
        super();
        this.registerUseCase = _registerUseCase;
    }

    public async post(req: Request, res: Response): Promise<Response> {

        const input: RegisterInputDTO = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        };

        const result = await this.registerUseCase.execute(input);
        return res.status(201).json(result);
    }
}