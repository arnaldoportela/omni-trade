import { Request, Response } from "express";

import { RegisterInputDTO } from "../../../../../../../1-application/auth/dtos/input/RegisterInputDto";
import { RegisterUseCase } from "../../../../../../../1-application/auth/useCases/RegisterUsecase";
import { IRegisterUseCase } from "../../../../../../../1-application/auth/useCases/ports/IRegisterUsecase";

import { Injectable } from "../../../../../../../3-crosscutting/ioc/InjectableDecorator";

import { IRegisterController } from "../abstractions/v1/IRegisterController";

@Injectable()
export class RegisterController extends IRegisterController {

    constructor(private _registerUseCase: IRegisterUseCase) {
        super();
    }

    public async post(req: Request, res: Response): Promise<Response> {

        const input: RegisterInputDTO = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        };

        const result = await this._registerUseCase.execute(input);
        return res.status(201).json(result);
    }
}