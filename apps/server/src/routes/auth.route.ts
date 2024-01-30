import express, { Router } from "express";
const router: Router = express.Router();

// import controllers
import * as authController from "../controllers/auth.controller.js";
import * as authMiddleware from "../middlewares/auth.middleware.js";

// define routes
router.route('/register').post(authController.registerUser);
router.route('/login').post(authController.loginUser);
router.route('/logout').get(authController.logoutUser);

// export router
export default router;