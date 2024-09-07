import jwt from "jsonwebtoken";
import { User } from '../models/user.model.js';
import ErrorHandler from "../util/error.handler.js";
// verify access token
export const verifyAccessToken = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return next(new ErrorHandler(401, "Bearer token is not available!"));
    }
    // get access token
    const accessToken = authHeader.split(' ')[1];
    // verify access token
    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {
        if (err) {
            return next(new ErrorHandler(403, "Invalid access token."));
        }
        ;
        const userId = decoded._id;
        req.user = await User.findById(userId);
        console.log('req.user: ', req.user);
        next();
    });
};
