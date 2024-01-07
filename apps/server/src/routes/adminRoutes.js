import express from "express";
import * as authMiddleware from "../middlewares/authMiddleware.js";
import * as roleMiddleware from "../middlewares/roleMiddleware.js";
import * as adminController from "../controllers/adminController.js";

const router = express.Router();

router.route('/users').get(authMiddleware.verifyAccessToken, roleMiddleware.verifyAdmin, adminController.getUsers);

export default router;