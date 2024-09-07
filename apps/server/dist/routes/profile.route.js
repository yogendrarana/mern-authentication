import express from "express";
const router = express.Router();
// import controllers
import * as profileController from "../controllers/profile.controller.js";
// define routes
router.route('/me').get(profileController.getMyData);
// export router
export default router;
