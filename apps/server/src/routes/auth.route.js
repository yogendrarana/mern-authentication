import express from "express";
import * as authController from "../controllers/auth.controller.js";

const router = express.Router();

router.route('/login').post(authController.handleLogin);
router.route('/logout').get(authController.handleLogout);
router.route('/register').post(authController.handleRegister);

export default router;