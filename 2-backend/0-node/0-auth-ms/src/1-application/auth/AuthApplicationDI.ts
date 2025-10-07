import { IoCContainer } from "../../3-crosscutting/ioc/IoCContainer";

import { AbstractLoginUseCase } from "./useCases/ports/AbstractLoginUsecase";
import { AbstractRegisterUseCase } from "./useCases/ports/AbstractRegisterUsecase";

import { LoginUseCase } from "./useCases/LoginUsecase";
import { RegisterUseCase } from "./useCases/RegisterUsecase";
import { AbstractChangePasswordUseCase } from "./useCases/ports/AbstractChangePasswordUsecase";
import { ChangePasswordUseCase } from "./useCases/ChangePasswordUsecase";

export class AuthApplicationDI {
    public static register(container: IoCContainer): void {
        container.register({ service: AbstractRegisterUseCase, useClass: RegisterUseCase });
        container.register({ service: AbstractLoginUseCase, useClass: LoginUseCase });
        container.register({ service: AbstractChangePasswordUseCase, useClass: ChangePasswordUseCase });
    }
}