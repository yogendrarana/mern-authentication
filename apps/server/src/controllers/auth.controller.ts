import bcrypt from "bcrypt";
import { User } from "../models/user.model.js";
import ErrorHandler from "../util/error.handler.js";
import * as authSchema from "../zod/auth.schema.js";
import asyncHandler from "../util/async.handler.js";
import { AuthenticatedRequest } from "../types/index.js";
import { NextFunction, Request, Response } from "express";

// register controller
export const registerUser = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, password, confirm_password } = req.body;

    if (!email || !password || !confirm_password) {
        return next(new ErrorHandler(409, 'Please, provide the necessary input values.'));
    }

    if (password !== confirm_password) {
        return next(new ErrorHandler(400, 'Password do not match.'));
    }

    // check if email is valid
    const isValidEmail = (await authSchema.emailSchema.safeParseAsync(email));
    if (!isValidEmail.success) {
        return next(new ErrorHandler(400, isValidEmail.error.errors[0].message));
    }

    // check if password is valid
    const isValidPassword = (await authSchema.passwordSchema.safeParseAsync(password));
    if (!isValidPassword.success) {
        return next(new ErrorHandler(400, isValidPassword.error.errors[0].message));
    }

    // check if email is already used
    const isEmailUsed = await User.findOne({ email }).exec();
    if (isEmailUsed) {
        return next(new ErrorHandler(400, "Email is already used!"));
    }

    // create user
    const user = await User.create({ name, email, password });

    // create tokens
    const accessToken = user.createAccessToken();
    const refreshToken = user.createRefreshToken();

    // save refresh token in database
    user.refreshTokens = [refreshToken];
    await user.save();

    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.status(201).json({
        success: true,
        message: 'User created successfully!',
        data: {
            user,
            accessToken,
        }
    });
})


// login controller
export const loginUser = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return next(new ErrorHandler(400, 'Please enter all the fields!'));
    }

    const foundUser = await User.findOne({ email }).select('-__v').exec();
    console.log('foundUser: ', foundUser?.refreshTokens)
    if (!foundUser) {
        return next(new ErrorHandler(400, 'User does not exist!'));
    }

    const passwordMatched = await foundUser.comparePassword(password);
    if (!passwordMatched) {
        return next(new ErrorHandler(400, 'Invalid credentials!'));
    }

    // create tokens 
    const accessToken = foundUser.createAccessToken();
    const refreshToken = foundUser.createRefreshToken();

    // save refresh token in database
    const refreshTokenArray = foundUser.refreshTokens;
    foundUser.refreshTokens = [...refreshTokenArray, refreshToken];
    await foundUser.save();

    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.status(200).json({
        success: true,
        message: 'Logged in successfully!',
        data: {
            accessToken,
            user: foundUser
        }
    })
});


// logout controller
export const logoutUser = asyncHandler(async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
        return next(new ErrorHandler(401, 'Refresh token is not available!'));
    }

    const foundUser = await User.findOne({
        refreshTokens: {
            $elemMatch: {
                $eq: refreshToken,
            },
        },
    }).exec();

    if (!foundUser) {
        return next(new ErrorHandler(403, 'User does not exist!'));
    }

    // delete refresh token from database
    foundUser.refreshTokens = foundUser.refreshTokens.filter(token => token !== refreshToken);
    await foundUser.save();

    // delete cookie
    res.clearCookie('refreshToken', { httpOnly: true, secure: true, sameSite: 'none' });

    // redirect to the client URL
    res.status(200).json({
        success: true,
        message: 'Logged out successfully!',
    })
});
