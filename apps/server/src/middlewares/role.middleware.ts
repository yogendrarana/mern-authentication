import { NextFunction, Response } from "express";
import ErrorHandler from "../util/error.handler.js";
import { AuthenticatedRequest } from "../types/index.js";


export const verifyAdminRole = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (req.user.role !== 'admin') {
        return next(new ErrorHandler(403, "User do not have admin role to access this resource."));
    }
    next();
}