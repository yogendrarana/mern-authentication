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

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET!, async (err: any, decoded: any) => {
        if (err) {
            if (err.name === 'TokenExpiredError') {
                return next(new ErrorHandler(401, "Refresh token has expired. Please login again."));
            } else {
                return next(new ErrorHandler(403, "Invalid token. Please login again to continue!"));
            }
        }

        // check if the user exists 
        const foundUser = await User.findById(decoded._id).select('-__v').exec();

        // for some reason follwing code for fetching user by refresh token doesn't work in chrome and brave browser
        // works fine in firefox but not in chrome and brave browser
        // main suspect is because of useEffect in client side sending the request twice due to React.StrictMode
        // const foundUser = await User.findOne({
        //     refreshTokens: {
        //         $elemMatch: {
        //             $eq: refreshToken,
        //         },
        //     },
        // }).exec();

        // Check if the user exists
        if (!foundUser) {
            return next(new ErrorHandler(404, "User associated with this token does not exist!"));
        }

        // generate new access token and refresh token
        const newAccessToken = foundUser.createAccessToken();
        const newRefreshToken = foundUser.createRefreshToken();

        // Update refresh tokens array in the database
        // cannnot use .save() here because it will cause race condition and cause error:VersionError: No matching document found for id
        // instead use findOneAndUpdate() which ignores the version (__v) and updates the document directly
        await User.findOneAndUpdate(
            { _id: decoded._id },
            {
                $set: {
                    refreshTokens: foundUser.refreshTokens.map((token) =>
                        token === refreshToken ? newRefreshToken : token
                    ),
                },
            },
        );

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
