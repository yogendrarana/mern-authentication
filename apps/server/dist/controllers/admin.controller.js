import { User } from "../models/user.model.js";
import asyncHandler from "../util/async.handler.js";
// get dashboard data
export const getDashboardData = asyncHandler(async (req, res, next) => {
    const no_of_users = await User.countDocuments();
    console.log(no_of_users);
    res.status(200).json({
        success: true,
        message: "Fetched dashboard data successfully!",
        data: {
            no_of_users
        }
    });
});
// get users list
export const getUsersList = asyncHandler(async (req, res, next) => {
    const users = await User.find().select('-password -refreshTokens -__v').exec();
    res.status(200).json({
        success: true,
        message: "Fetched users list successfully!",
        data: {
            users
        }
    });
});
