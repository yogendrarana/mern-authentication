import jwt from "jsonwebtoken";
import { User } from '../models/user.model.js'
import ErrorHandler from "../util/error.handler.js";

// verify access token
export const verifyAccessToken = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) return next(new ErrorHandler("Bearer token is not available!", 401));
    const accessToken = authHeader.split(' ')[1];
    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {
        if (err) {
            return next(new ErrorHandler("Invalid access tokennnnnnn.", 403))
        };

        req.user = await User.findById(decoded._id);
        next();
    })
};

// verify refresh token
export const verifyRefreshToken = (req, res, next) => {
    const { refreshToken } = req.cookies;
    if (!refreshToken || refreshToken === undefined) {
        return next(new ErrorHandler("Token not found", 401));
    } 

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, decoded) => {
        if (err) {
            return next(new ErrorHandler("Forbidden", 403))
        };

        req.user = await User.findById(decoded._id);
        next();
    })
};