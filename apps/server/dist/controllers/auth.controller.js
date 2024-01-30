import { User } from "../models/user.model.js";
import ErrorHandler from "../util/error.handler.js";
import asyncHandler from "../util/async.handler.js";
// register controller
export const registerUser = asyncHandler(async (req, res, next) => {
    const { name, email, password, confirm_password } = req.body;
    if (password !== confirm_password) {
        return next(new ErrorHandler(400, 'Password do not match.'));
    }
    if (!name || !email || !password || !confirm_password) {
        return next(new ErrorHandler(409, 'Please, provide the necessary input values.'));
    }
    // check if email is already used
    const isEmailUsed = await User.findOne({ email });
    if (isEmailUsed)
        return next(new ErrorHandler(400, "Email is already used!"));
    // create user
    const user = await User.create({ name, email, password });
    // create tokens
    const accessToken = user.createAccessToken();
    const refreshToken = user.createRefreshToken();
    // save refresh token in database
    user.refreshTokens.push(refreshToken);
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
});
// login controller
export const loginUser = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password)
        return next(new ErrorHandler(400, 'Please enter all the fields!'));
    const foundUser = await User.findOne({ email });
    if (!foundUser)
        return next(new ErrorHandler(400, 'User does not exist!'));
    const passwordMatched = await foundUser.comparePassword(password);
    if (!passwordMatched)
        return next(new ErrorHandler(400, 'Invalid credentials!'));
    // create tokens 
    const accessToken = foundUser.createAccessToken();
    const refreshToken = foundUser.createRefreshToken();
    // save refresh token in database
    foundUser.refreshTokens.push(refreshToken);
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
    });
});
// logout controller
export const logoutUser = asyncHandler(async (req, res, next) => {
    const { refreshToken } = req.cookies;
    if (!refreshToken) {
        return next(new ErrorHandler(401, 'Refresh token is not available!'));
    }
    const foundUser = await User.findOne({ refreshToken });
    if (!foundUser) {
        return next(new ErrorHandler(403, 'User does not exist!'));
    }
    // delete refresh token from database
    foundUser.refreshTokens = foundUser.refreshTokens.filter(token => token !== refreshToken);
    await foundUser.save();
    // delete cookie
    res.clearCookie('refreshToken', { httpOnly: true, secure: true, sameSite: 'none' });
    // redirect to the client URL
    return res.redirect(process.env.CLIENT_URL);
});
