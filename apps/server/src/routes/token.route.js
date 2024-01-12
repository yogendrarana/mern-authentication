import express from 'express';
import * as tokenController from '../controllers/token.controller.js';

const router = express.Router();

router.route('/refresh').get(tokenController.handleRefreshToken);

export default router;