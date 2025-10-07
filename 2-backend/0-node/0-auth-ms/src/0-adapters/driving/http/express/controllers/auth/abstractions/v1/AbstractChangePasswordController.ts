import { Request, Response } from "express";
import { Injectable } from "@crosscutting/ioc/InjectableDecorator";

@Injectable()
export abstract class AbstractChangePasswordController {
    abstract post(req: Request, res: Response): Promise<Response>;
}