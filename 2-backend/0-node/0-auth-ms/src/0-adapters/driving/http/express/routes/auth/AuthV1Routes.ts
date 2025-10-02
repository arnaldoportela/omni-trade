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
    private router: Router;

    constructor(
        private _registerController: IRegisterController,
        private _loginController: ILoginController,
        private _validateController: IValidateController,
        private _logoutController: ILogoutController) {
        this.router = Router();
    }

    public register(): Router {
        this.router.post('/v1/register', asyncErrorWrapper(this._registerController.post.bind(this._registerController)));
        this.router.post('/v1/login', asyncErrorWrapper(this._loginController.post.bind(this._loginController)));
        this.router.post('/v1/validate', asyncErrorWrapper(this._validateController.post.bind(this._validateController)));
        this.router.post('/v1/logout', isAuthenticatedMiddleware, asyncErrorWrapper(this._logoutController.post.bind(this._logoutController)));
        return this.router;
    }
}