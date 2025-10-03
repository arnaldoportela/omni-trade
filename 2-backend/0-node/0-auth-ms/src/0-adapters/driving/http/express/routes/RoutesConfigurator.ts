import { Express, Request, Response } from "express";

import { Injectable } from "@crosscutting/ioc/InjectableDecorator";

import { AuthV1Routes } from "./auth/AuthV1Routes";

@Injectable()
export class RoutesConfigurator {

  private authRotes: AuthV1Routes

  constructor(private _authRotes: AuthV1Routes) {
    this.authRotes = _authRotes;
  }

  public register(app: Express): void {
    app.get("/", (req: Request, res: Response) => {
      res.send("Auth MS is running");
    });

    app.use('/auth', this.authRotes.register());
  }
}