import { IoCContainer } from "../../../../3-crosscutting/ioc/IoCContainer";

import { AbstractLoginController } from "./controllers/auth/abstractions/v1/AbstractLoginController";
import { AbstractRegisterController } from "./controllers/auth/abstractions/v1/AbstractRegisterController";
import { AbstractLogoutController } from "./controllers/auth/abstractions/v1/AbstractLogoutController";
import { AbstractValidateController } from "./controllers/auth/abstractions/v1/AbstractValidateController";

import { LoginController } from "./controllers/auth/v1/LoginController";
import { RegisterController } from "./controllers/auth/v1/RegisterController";
import { LogoutController } from "./controllers/auth/v1/LogoutController";
import { ValidateController } from "./controllers/auth/v1/ValidateController";

import { AuthV1Routes } from "./routes/auth/AuthV1Routes";
import { RoutesConfigurator } from "./routes/RoutesConfigurator";

import { PreRoutesMiddlewareConfigurator } from "./middlewares/PreRoutesMiddlewareConfigurator";
import { PostRoutesMiddlewareConfigurator } from "./middlewares/PostRoutesMiddlewareConfigurator";
import { App } from "./App";
import { AbstractChangePasswordController } from "./controllers/auth/abstractions/v1/AbstractChangePasswordController";
import { ChangePasswordController } from "./controllers/auth/v1/ChangePasswordController";
import { CookieOptionsBuilder } from "./utils/CookieOptionsBuilder";
import { IoCServiceLifetimeEnum } from "@crosscutting/ioc/IoCServiceLifetimeEnum";

export class ExpressHttpDrivingAdapterDI {
    public static register(container: IoCContainer): void {

        container.register({ service: CookieOptionsBuilder, lifetime: IoCServiceLifetimeEnum.TRANSIENT });
        container.register({ service: AbstractLoginController, useClass: LoginController });
        container.register({ service: AbstractRegisterController, useClass: RegisterController });
        container.register({ service: AbstractLogoutController, useClass: LogoutController });
        container.register({ service: AbstractValidateController, useClass: ValidateController });
        container.register({ service: AbstractChangePasswordController, useClass: ChangePasswordController });
        container.register({ service: AuthV1Routes });
        container.register({ service: RoutesConfigurator });
        container.register({ service: PreRoutesMiddlewareConfigurator });
        container.register({ service: PostRoutesMiddlewareConfigurator });
        container.register({ service: App });
    }
}