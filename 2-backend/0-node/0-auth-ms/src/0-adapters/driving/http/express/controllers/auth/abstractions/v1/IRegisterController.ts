import { Request, Response } from "express";
import { Injectable } from "../../../../../../../../3-crosscutting/ioc/InjectableDecorator";

@Injectable()
export abstract class IRegisterController {
    abstract post(req: Request, res: Response): Promise<Response>;
}