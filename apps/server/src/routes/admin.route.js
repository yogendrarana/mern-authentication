import express from "express";
import * as authMiddleware from "../middlewares/auth.middleware.js";
import * as roleMiddleware from "../middlewares/role.middleware.js";
import * as adminController from "../controllers/admin.controller.js";

const router = express.Router();

router.route('/users').get(authMiddleware.verifyAccessToken, roleMiddleware.verifyAdmin, adminController.getUsers);

export default router;