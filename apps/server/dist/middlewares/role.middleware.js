import ErrorHandler from "../util/error.handler.js";
export const verifyAdminRole = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return next(new ErrorHandler(403, "User do not have admin role to access this resource."));
    }
    next();
};
