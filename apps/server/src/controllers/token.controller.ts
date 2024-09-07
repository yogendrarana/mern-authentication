import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import asyncHandler from "../util/async.handler.js";
import ErrorHandler from "../util/error.handler.js";
import { NextFunction, Request, Response } from "express";

export const handleRefreshToken = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { refreshToken } = req.cookies;
    if (!refreshToken) {
        return next(new ErrorHandler(401, "Refresh token is not found. Please login again."));
    }

    const foundUser = await User.findOne({ refreshTokens: refreshToken }).exec();

    if (!foundUser) {
        // detected token reuse we can try to solve it by deleting the refresh tokens of the user associated to the refresh token
        // jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET!, async (err: any, decoded: any) => {
        //     if (err) return res.sendStatus(403);
        //     const hackedUser = await User.findById(decoded._id).exec();
        //     if (!hackedUser) return res.sendStatus(403);
        //     hackedUser.refreshTokens = [];
        // });

        return next(new ErrorHandler(403, "User associated to refresh token does not exist!"));
    };

    // new refresh token array without the current refresh token
    const newRefreshTokenArray = foundUser.refreshTokens.filter(rt => rt !== refreshToken);

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET!, async (err: any, decoded: any) => {
        if (err) {
            foundUser.refreshTokens = [...newRefreshTokenArray];
            await foundUser.save();
            res.clearCookie('refreshToken', { httpOnly: true, secure: true, sameSite: 'none' });
            return next(new ErrorHandler(403, "Invalid or expired token. Please login again to continue!"));
        }

        // check if the user id and the decoded user id are same
        if (decoded._id.toString() !== foundUser._id.toString()) {
            foundUser.refreshTokens = [...newRefreshTokenArray];
            await foundUser.save();
            res.clearCookie('refreshToken', { httpOnly: true, secure: true, sameSite: 'none' });
            return next(new ErrorHandler(403, "Token does not belong to the user. Please login again to continue"));
        }

        // generate new access token and refresh token
        const newAccessToken = foundUser.createAccessToken();
        const newRefreshToken = foundUser.createRefreshToken();

        // update refresh tokens array in the database
        foundUser.refreshTokens = [...newRefreshTokenArray, newRefreshToken];
        await foundUser.save();

        // set the new refresh token in the cookie
        res.cookie('refreshToken', newRefreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        // send the new access token and user data in the response
        res.status(200).json({
            success: true,
            message: "Access token generated successfully!",
            data: {
                accessToken: newAccessToken,
                user: foundUser
            }
        })
    })
});
