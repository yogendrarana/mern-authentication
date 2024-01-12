import { User } from "../models/user.model.js";
import asyncHandler from "../util/async.handler.js";

export const getUsers = asyncHandler(async (req, res, next) => {
    const users = await User.find({}).select('-password -refreshTokens -createdAt -updatedAt');

    res.status(200).json({
        success: true,
        message: "Fetched users successfully!",
        data: {
            users
        }
    })
})