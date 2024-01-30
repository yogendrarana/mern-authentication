import { User } from "../models/user.model.js";
import asyncHandler from "../util/async.handler.js";
import { NextFunction, Request, Response } from "express";


// get dashboard data
export const getDashboardData = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
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
