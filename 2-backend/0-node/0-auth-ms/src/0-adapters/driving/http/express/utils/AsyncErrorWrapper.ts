import { NextFunction, Request, RequestHandler, Response } from "express";

export function asyncErrorWrapper(handler: RequestHandler): RequestHandler { 
    return (req: Request, res: Response, next: NextFunction): void => { 
        Promise.resolve(handler(req, res, next)).catch(err => {
            next(err);
         });
    }
}