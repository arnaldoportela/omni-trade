import { NextFunction, Request, RequestHandler, Response } from "express";

export function errorHandlerMiddleware(error: Error, req: Request, res: Response, next: NextFunction): void { 
    console.error('HANDLED ERROR: ', error); // Log the error for debugging purposes]
    res.status(501).json({ message: "Internal Server Error" });
}