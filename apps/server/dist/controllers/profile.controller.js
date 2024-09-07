import { User } from "../models/user.model.js";
import asyncHandler from "../util/async.handler.js";
export const getMyData = asyncHandler(async (req, res) => {
    const user = await User.findById({ _id: req.user.id });
    res.status(200).json({
        success: true,
        message: "User data fetched successfully!",
        data: {
            user
        }
    });
});
