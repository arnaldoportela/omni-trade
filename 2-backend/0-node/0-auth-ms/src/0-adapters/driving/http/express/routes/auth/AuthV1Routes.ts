import { Router } from 'express';

import { Injectable } from '@crosscutting/ioc/InjectableDecorator';

import { isAuthenticatedMiddleware } from '../../middlewares/IsAuthenticated';

import { asyncErrorWrapper } from '../../utils/AsyncErrorWrapper';

import { ILoginController } from '../../controllers/auth/abstractions/v1/ILoginController';
import { IRegisterController } from '../../controllers/auth/abstractions/v1/IRegisterController';
import { IValidateController } from '../../controllers/auth/abstractions/v1/IValidateController';
import { ILogoutController } from '../../controllers/auth/abstractions/v1/ILogoutController';

@Injectable()
export class AuthV1Routes {
    private readonly router: Router;

    private readonly registerController: IRegisterController;
    private readonly loginController: ILoginController;
    private readonly validateController: IValidateController;
    private readonly logoutController: ILogoutController;

    constructor(
        _registerController: IRegisterController,
        _loginController: ILoginController,
        _validateController: IValidateController,
        _logoutController: ILogoutController) {
        this.router = Router();

        this.registerController = _registerController;
        this.loginController = _loginController;
        this.validateController = _validateController;
        this.logoutController = _logoutController;
    }

    public register(): Router {
        this.router.post('/v1/register', asyncErrorWrapper(this.registerController.post.bind(this.registerController)));
        this.router.post('/v1/login', asyncErrorWrapper(this.loginController.post.bind(this.loginController)));
        this.router.post('/v1/validate', asyncErrorWrapper(this.validateController.post.bind(this.validateController)));
        this.router.post('/v1/logout', isAuthenticatedMiddleware, asyncErrorWrapper(this.logoutController.post.bind(this.logoutController)));
        return this.router;
    }
}