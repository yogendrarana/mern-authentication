import express from 'express';
const router = express.Router();
// import controllers
import * as sessionCOntroller from '../controllers/session.controller.js';
// define routes
router.route('/oauth/google').get(sessionCOntroller.googleOauthHandler);
// export router
export default router;
