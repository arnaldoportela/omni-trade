import { Injectable } from "../../../3-crosscutting/ioc/InjectableDecorator";

import { RegisterInputDTO } from "../dtos/input/RegisterInputDto";

import { IRegisterUseCase } from "./ports/IRegisterUsecase";

@Injectable()
export class RegisterUseCase extends IRegisterUseCase {
    async execute(data: RegisterInputDTO): Promise<any> {
        // Implement registration logic here
        console.log("Registering user:", data);
        return { message: "User registered successfully" };
    }
}