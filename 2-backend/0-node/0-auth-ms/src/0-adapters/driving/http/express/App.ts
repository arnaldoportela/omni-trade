import express, { Express } from "express";

import { Injectable } from "@crosscutting/ioc/InjectableDecorator";

import { RoutesConfigurator } from "./routes/RoutesConfigurator";
import { PreRoutesMiddlewareConfigurator } from "./middlewares/PreRoutesMiddlewareConfigurator";
import { PostRoutesMiddlewareConfigurator } from "./middlewares/PostRoutesMiddlewareConfigurator";

@Injectable()
export class App {
  private readonly app: Express;
  private readonly routesConfigurator: RoutesConfigurator;
  private readonly preRoutesMiddlewareConfigurator: PreRoutesMiddlewareConfigurator;
  private readonly postRoutesMiddlewareConfigurator: PostRoutesMiddlewareConfigurator;

  constructor(
    _routesConfigurator: RoutesConfigurator,
    _preRoutesMiddlewareConfigurator: PreRoutesMiddlewareConfigurator,
    _postRoutesMiddlewareConfigurator: PostRoutesMiddlewareConfigurator
  ) {
    this.app = express();
    this.routesConfigurator = _routesConfigurator;
    this.preRoutesMiddlewareConfigurator = _preRoutesMiddlewareConfigurator;
    this.postRoutesMiddlewareConfigurator = _postRoutesMiddlewareConfigurator;
  }

  public build(): Express {
    this.preRoutesMiddlewareConfigurator.register(this.app);
    this.routesConfigurator.register(this.app);
    this.postRoutesMiddlewareConfigurator.register(this.app);

    return this.app;
  }
}