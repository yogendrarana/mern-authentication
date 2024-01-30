import asyncHandler from "../util/async.handler.js";
import { Account } from "../models/account.model.js";
import { NextFunction, Request, Response } from "express";
import * as accountService from "../service/account.service.js";
import ErrorHandler from "../util/error.handler.js";

export const googleOauthHandler = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {

    // get the code from the request
    const code = req.query.code as string;

    // Check if code is present
    if (!code) {
        return next(new ErrorHandler(400, 'OAuth code is not present.'));
    }

    // get the id and access token from google using above code 
    const googleToken = await accountService.getGoogleOauthToken({ code });

    // get the user info from google using above access token
    const googleUser = await accountService.getGoogleUserInfo({ access_token: googleToken.access_token });

    // upsert the user info in the database
    const account = await Account.findOneAndUpdate(
        { email: googleUser.email, },
        { id: googleUser.id, name: googleUser.name, email: googleUser.email, avatar: googleUser.picture, verified_email: googleUser.verified_email, },
        { new: true, upsert: true, runValidators: true, }
    );

    const accessToken = account.createAccessToken();
    const refreshToken = account.createRefreshToken();

    // create a session for the user

    // set cookies in the response
    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        maxAge: 24 * 60 * 60 * 1000
    });

    // redirect back to the client
    res.redirect(process.env.CLIENT_URL!);

    // send response
    res.status(200).json({
        success: true,
        message: "Google OAuth",
        data: {
            account,
            accessToken,
        }
    });
});