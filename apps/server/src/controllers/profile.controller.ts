import { Request, Response } from "express";
import { User } from "../models/user.model.js";
import asyncHandler from "../util/async.handler.js";
import { AuthenticatedRequest } from "../types/index.js";

export const getMyData = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const user = await User.findById({ _id: req.user.id });

    res.status(200).json({
        success: true,
        message: "User data fetched successfully!",
        data: {
            user
        }
    });
});