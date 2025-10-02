import { Injectable } from "../../../3-crosscutting/ioc/InjectableDecorator";

import { LoginInputDTO } from "../dtos/input/LoginInputDto";

import { ILoginUseCase } from "./ports/ILoginUsecase";
import { LoginOutputDTO } from "../dtos/output/LoginOutputDto";

@Injectable()
export class LoginUseCase extends ILoginUseCase {
    async execute(data: LoginInputDTO): Promise<LoginOutputDTO> {
        // Implement registration logic here
        console.log("Login in user:", data);
        return { sessionId: "session.id" } as LoginOutputDTO;
    }
}