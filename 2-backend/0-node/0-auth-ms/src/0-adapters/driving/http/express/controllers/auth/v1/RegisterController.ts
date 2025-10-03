import { Request, Response } from "express";

import { RegisterInputDTO } from "@application/auth/dtos/input/RegisterInputDto";
import { IRegisterUseCase } from "@application/auth/useCases/ports/IRegisterUsecase";

import { Injectable } from "@crosscutting/ioc/InjectableDecorator";

import { IRegisterController } from "../abstractions/v1/IRegisterController";

@Injectable()
export class RegisterController extends IRegisterController {

    private readonly registerUseCase: IRegisterUseCase;
 
    constructor(_registerUseCase: IRegisterUseCase) {
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