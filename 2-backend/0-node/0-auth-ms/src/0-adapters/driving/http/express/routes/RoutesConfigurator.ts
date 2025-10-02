import { Request, Response, Router } from "express";

import { Injectable } from "@crosscutting/ioc/InjectableDecorator";

import { AuthV1Routes } from "./auth/AuthV1Routes";

@Injectable()
export class RoutesConfigurator {

  constructor(private _authRotes: AuthV1Routes) {}

  public register(): Router {
    const router = Router();
    router.get("/", (req: Request, res: Response) => {
      res.send("Auth MS is running");
    });

    router.use('/auth', this._authRotes.register());

    return router;
  }
}