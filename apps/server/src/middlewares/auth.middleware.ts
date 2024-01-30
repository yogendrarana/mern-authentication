import jwt from "jsonwebtoken";
import { User } from '../models/user.model.js'
import ErrorHandler from "../util/error.handler.js";
import { AuthenticatedRequest } from "../types/index.js";
import { NextFunction, Request, Response } from "express";

// verify access token
export const verifyAccessToken = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader || !(authHeader as string).startsWith('Bearer ')) return next(new ErrorHandler(401, "Bearer token is not available!"));
    const accessToken = (authHeader as string).split(' ')[1];
    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET!, async (err, decoded) => {
        if (err) {
            return next(new ErrorHandler(403, "Invalid access token."))
        };

        const userId = (decoded as any)._id;
        req.user = await User.findById(userId);
        next();
    })
};