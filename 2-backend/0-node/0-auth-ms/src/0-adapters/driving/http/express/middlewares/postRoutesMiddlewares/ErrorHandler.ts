import { NextFunction, Request, Response } from "express";

export function errorHandlerMiddleware(
    error: Error,
    req: Request,
    res: Response,
    //eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    /* required by Express */ next: NextFunction 
): void {
    res.status(501).json({ message: "Internal Server Error" });
}