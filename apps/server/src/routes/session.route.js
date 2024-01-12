import express from 'express';

import * as sessionCOntroller from '../controllers/session.controller.js';
const router = express.Router();

router.route('/oauth/google').get(sessionCOntroller.googleOauthHandler);

export default router;