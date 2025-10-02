import { asyncErrorWrapper } from "../utils/AsyncErrorWrapper";


async function authorizeRoles(roles: string[]) { 
    return (req: Request, res: Response, next: NextFunction) => { 
        // Assuming req.user is populated with user info including roles
        const userRoles = req.user?.roles || [];

        const hasRole = roles.some(role => userRoles.includes(role));
        if (!hasRole) { 
            return res.status(403).json({ message: "Forbidden" });
        }
        next();
    }
}

export const authorizeRolesMiddleware = (roles: string[]) => asyncErrorWrapper(authorizeRoles(roles));