import express from "express";
const router = express.Router();
// import controllers
import * as authMiddleware from "../middlewares/auth.middleware.js";
import * as roleMiddleware from "../middlewares/role.middleware.js";
import * as adminController from "../controllers/admin.controller.js";
// define routes
router.route('/dashboard').get(authMiddleware.verifyAccessToken, roleMiddleware.verifyAdminRole, adminController.getDashboardData);
// export router
export default router;
