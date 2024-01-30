import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import asyncHandler from "../util/async.handler.js";
import ErrorHandler from "../util/error.handler.js";
export const handleRefreshToken = asyncHandler(async (req, res, next) => {
    const { refreshToken } = req.cookies;
    if (!refreshToken) {
        return next(new ErrorHandler(401, "Refresh token is not found. Please login again."));
    }
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, decoded) => {
        if (err) {
            if (err.name === 'TokenExpiredError') {
                return next(new ErrorHandler(401, "Refresh token has expired. Please login again."));
            }
            else {
                return next(new ErrorHandler(403, "Invalid token. Please login to continue!"));
            }
        }
        const user = await User.findById(decoded._id);
        // Check if the user exists
        if (!user) {
            return next(new ErrorHandler(404, "User not found!"));
        }
        // Check if the id associated with the refresh token matches the id of the user
        if (decoded._id.toString() !== user._id.toString()) {
            return next(new ErrorHandler(403, "Invalid token. Please login to continue!"));
        }
        const accessToken = user.createAccessToken();
        const refreshToken = user.createRefreshToken();
        user.refreshTokens.push(refreshToken);
        await user.save();
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });
        res.status(200).json({
            success: true,
            message: "Access token generated successfully!",
            data: {
                accessToken,
                user
            }
        });
    });
});
