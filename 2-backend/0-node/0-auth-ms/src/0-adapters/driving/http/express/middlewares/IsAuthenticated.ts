import { NextFunction, Request, Response } from "express";
import { asyncErrorWrapper } from "../utils/AsyncErrorWrapper";

async function isAuthenticated(req: Request, res: Response, next: NextFunction) { 

    if(!req.cookies) { 
        return res.status(401).json({ message: "Unauthorized" });
    }
    
    const { sessionId } = req.cookies;
    
    if (!sessionId) { 
        return res.status(401).json({ message: "Unauthorized" });
    }

    // Validate sessionId here (e.g., using JWT or any other method)
    next();
};

export const isAuthenticatedMiddleware = asyncErrorWrapper(isAuthenticated);