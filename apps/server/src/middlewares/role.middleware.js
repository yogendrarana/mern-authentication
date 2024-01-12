import ErrorHandler from "../util/error.handler.js";

export const verifyAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') return next(new ErrorHandler("User is not an admin", 403));
    next();
}