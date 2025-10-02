import { IoCContainer } from "../../../../3-crosscutting/ioc/IoCContainer";

import { ILoginController } from "./controllers/auth/abstractions/v1/ILoginController";
import { IRegisterController } from "./controllers/auth/abstractions/v1/IRegisterController";
import { ILogoutController } from "./controllers/auth/abstractions/v1/ILogoutController";
import { IValidateController } from "./controllers/auth/abstractions/v1/IValidateController";

import { LoginController } from "./controllers/auth/v1/LoginController";
import { RegisterController } from "./controllers/auth/v1/RegisterController";
import { LogoutController } from "./controllers/auth/v1/LogoutController";
import { ValidateController } from "./controllers/auth/v1/ValidateController";

import { AuthV1Routes } from "./routes/auth/AuthV1Routes";
import { RoutesConfigurator } from "./routes/RoutesConfigurator";

import { PreRoutesMiddlewareConfigurator } from "./middlewares/PreRoutesMiddlewareConfigurator";
import { PostRoutesMiddlewareConfigurator } from "./middlewares/PostRoutesMiddlewareConfigurator";
import { App } from "./App";

export class ExpressHttpDrivingAdapterDI {
    public static register(container: IoCContainer): void {
        container.register({ service: ILoginController, useClass: LoginController });
        container.register({ service: IRegisterController, useClass: RegisterController });
        container.register({ service: ILogoutController, useClass: LogoutController });
        container.register({ service: IValidateController, useClass: ValidateController });
        container.register({ service: AuthV1Routes });
        container.register({ service: RoutesConfigurator });
        container.register({ service: PreRoutesMiddlewareConfigurator });
        container.register({ service: PostRoutesMiddlewareConfigurator});
        container.register({ service: App });
    }
}