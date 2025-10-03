import { IoCContainer } from "../../../../../3-crosscutting/ioc/IoCContainer";

import { ILoginUseCase } from "./auth/useCases/ILoginUsecase";
import { IRegisterUseCase } from "./auth/useCases/IRegisterUsecase";

import { LoginUseCase } from "@application/auth/useCases/LoginUsecase";
import { RegisterUseCase } from "@application/auth/useCases/RegisterUsecase";

export class AuthPortsDI {
    public static register(container: IoCContainer): void {
        container.register({ service: IRegisterUseCase, useClass: RegisterUseCase });
        container.register({ service: ILoginUseCase, useClass: LoginUseCase });
    }
}