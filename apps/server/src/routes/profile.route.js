import express from "express";
import * as profileController from "../controllers/profile.controller.js";

const router = express.Router();

router.route('/me').get(profileController.getMyData);

export default router;