import express, { Express } from "express";

import { Injectable } from "@crosscutting/ioc/InjectableDecorator";

import { RoutesConfigurator } from "./routes/RoutesConfigurator";
import { PreRoutesMiddlewareConfigurator } from "./middlewares/PreRoutesMiddlewareConfigurator";
import { PostRoutesMiddlewareConfigurator } from "./middlewares/PostRoutesMiddlewareConfigurator";

@Injectable()
export class App {
  private readonly app: Express;

  constructor(
    private _routesConfigurator: RoutesConfigurator,
    private _preRoutesMiddlewareConfigurator: PreRoutesMiddlewareConfigurator,
    private _postRoutesMiddlewareConfigurator: PostRoutesMiddlewareConfigurator
  ) {
    this.app = express();
  }

  public build(): Express {
    this.app.use(this._preRoutesMiddlewareConfigurator.register());
    this.app.use(this._routesConfigurator.register());
    this.app.use(this._postRoutesMiddlewareConfigurator.register());

    return this.app;
  }
}