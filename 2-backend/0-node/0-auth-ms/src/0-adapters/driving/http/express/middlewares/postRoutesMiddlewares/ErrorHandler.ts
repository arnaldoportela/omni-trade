import { NextFunction, Request, Response } from "express";

export function errorHandlerMiddleware(error: Error, req: Request, res: Response, next: NextFunction): void { 
    console.error('HANDLED ERROR: ', error);
    res.status(501).json({ message: "Internal Server Error" });
}