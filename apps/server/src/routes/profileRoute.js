import express from "express";
import * as profileController from "../controllers/profileController.js";
import * as authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route('/me').get(profileController.getMyData);

export default router;