import { IoCContainer } from "../../3-crosscutting/ioc/IoCContainer";

import { ILoginUseCase } from "./useCases/ports/ILoginUsecase";
import { IRegisterUseCase } from "./useCases/ports/IRegisterUsecase";

import { LoginUseCase } from "./useCases/LoginUsecase";
import { RegisterUseCase } from "./useCases/RegisterUsecase";

export class AuthApplicationDI {
    public static register(container: IoCContainer): void {
        container.register({ service: IRegisterUseCase, useClass: RegisterUseCase });
        container.register({ service: ILoginUseCase, useClass: LoginUseCase });
    }
}