import express from "express";
import * as authMiddleware from "../middlewares/auth.middleware.js";
import * as roleMiddleware from "../middlewares/role.middleware.js";
import * as adminController from "../controllers/admin.controller.js";

const router = express.Router();

router.route('/').get(authMiddleware.verifyAccessToken, roleMiddleware.verifyAdminRole, (req, res) => res.status(200).json({ success: true, message: "Admin route" }));
router.route('/dashboard').get(authMiddleware.verifyAccessToken, roleMiddleware.verifyAdminRole, adminController.getDashboardData);
router.route('/users').get(authMiddleware.verifyAccessToken, roleMiddleware.verifyAdminRole, adminController.getUsers);

export default router;