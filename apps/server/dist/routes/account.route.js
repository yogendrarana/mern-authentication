import express from 'express';
const router = express.Router();
// import controllers
import * as accountController from '../controllers/account.controller.js';
// define routes
router.route('/google/oauth/callback').get(accountController.googleOauthHandler);
// export router
export default router;
