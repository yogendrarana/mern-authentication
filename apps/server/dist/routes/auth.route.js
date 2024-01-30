import express from "express";
const router = express.Router();
// import controllers
import * as authController from "../controllers/auth.controller.js";
// define routes
router.route('/register').post(authController.registerUser);
router.route('/login').post(authController.loginUser);
router.route('/logout').get(authController.logoutUser);
// export router
export default router;
