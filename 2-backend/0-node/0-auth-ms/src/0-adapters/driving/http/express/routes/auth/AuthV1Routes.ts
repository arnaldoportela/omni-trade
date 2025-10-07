import { Router } from 'express';

import { Injectable } from '@crosscutting/ioc/InjectableDecorator';

import { isAuthenticatedMiddleware } from '../../middlewares/IsAuthenticated';

import { asyncErrorWrapper } from '../../utils/AsyncErrorWrapper';

import { AbstractLoginController } from '../../controllers/auth/abstractions/v1/AbstractLoginController';
import { AbstractRegisterController } from '../../controllers/auth/abstractions/v1/AbstractRegisterController';
import { AbstractValidateController } from '../../controllers/auth/abstractions/v1/AbstractValidateController';
import { AbstractLogoutController } from '../../controllers/auth/abstractions/v1/AbstractLogoutController';
import { AbstractChangePasswordController } from '../../controllers/auth/abstractions/v1/AbstractChangePasswordController';

@Injectable()
export class AuthV1Routes {
    private readonly router: Router;

    private readonly registerController: AbstractRegisterController;
    private readonly loginController: AbstractLoginController;
    private readonly validateController: AbstractValidateController;
    private readonly logoutController: AbstractLogoutController;
    private readonly changePasswordController: AbstractChangePasswordController;

    constructor(
        _registerController: AbstractRegisterController,
        _loginController: AbstractLoginController,
        _validateController: AbstractValidateController,
        _logoutController: AbstractLogoutController,
        _changePasswordController: AbstractChangePasswordController
    ) {
        this.router = Router();

        this.registerController = _registerController;
        this.loginController = _loginController;
        this.validateController = _validateController;
        this.logoutController = _logoutController;
        this.changePasswordController = _changePasswordController;
    }

    public register(): Router {
        this.router.post('/v1/register', asyncErrorWrapper(this.registerController.post.bind(this.registerController)));
        this.router.post('/v1/login', asyncErrorWrapper(this.loginController.post.bind(this.loginController)));
        this.router.post('/v1/validate', asyncErrorWrapper(this.validateController.post.bind(this.validateController)));
        this.router.post('/v1/logout', isAuthenticatedMiddleware, asyncErrorWrapper(this.logoutController.post.bind(this.logoutController)));
        this.router.post('/v1/changePassword', asyncErrorWrapper(this.changePasswordController.post.bind(this.changePasswordController)));
        return this.router;
    }
}