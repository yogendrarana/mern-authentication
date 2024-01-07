import express from "express";
import * as userController from "../controllers/userController.js";
import * as authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route('/me').get(authMiddleware.verifyRefreshToken, userController.getMyData);

export default router;