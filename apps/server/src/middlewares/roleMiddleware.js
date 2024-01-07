import ErrorHandler from "../util/errorHandler.js";

export const verifyAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') return next(new ErrorHandler("Forbidden", 403));
    next();
}