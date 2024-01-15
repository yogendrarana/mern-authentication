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
    })
});


// get user list
export const getUsers = asyncHandler(async (req, res, next) => {
    const users = await User.find({}).select('-password -refreshToken -createdAt -updatedAt');

    res.status(200).json({
        success: true,
        message: "Fetched users successfully!",
        data: {
            users
        }
    })
});