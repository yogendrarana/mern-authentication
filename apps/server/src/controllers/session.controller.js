import asyncHandler from "../util/async.handler.js";
import * as userService from "../service/account.service.js";
import {Account} from "../models/account.model.js";

export const googleOauthHandler = asyncHandler(async (req, res, next) => {

    // get the code from the request
    const code = req.query.code;

    // get the id and access token from google using above code 
    const googleToken = await userService.getGoogleOauthToken({ code });
    
    // get the user info from google using above access token
    const googleUser = await userService.getGoogleUser({ access_token: googleToken.access_token });

    // upsert the user info in the database
    const account = await Account.findOneAndUpdate({
        email: googleUser.email,
    }, {
        id: googleUser.id,
        name: googleUser.name,
        email: googleUser.email,
        avatar: googleUser.picture,
        verified_email: googleUser.verified_email,
    }, {
        new: true,
        upsert: true,
        runValidators: true,
    }, {
        upsert: true,
        new: true,
    })

    const accessToken = account.getAccessToken();
    const refreshToken = account.getRefreshToken();

    // create a session for the user

    // set cookies in the response
    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        maxAge: 24 * 60 * 60 * 1000
    });

    // redirect back to the client
    res.redirect(process.env.CLIENT_URL);
    
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