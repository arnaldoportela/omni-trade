import { Request, Response } from "express";
import { Injectable } from "@crosscutting/ioc/InjectableDecorator";

@Injectable()
export abstract class AbstractLogoutController {
    abstract post(req: Request, res: Response): Promise<Response>;
}