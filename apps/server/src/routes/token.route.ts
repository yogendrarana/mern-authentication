import express, { Router } from 'express';
const router: Router = express.Router();

// import controllers
import * as tokenController from '../controllers/token.controller.js';

// define routes
router.route('/refresh').get(tokenController.handleRefreshToken);

// export router
export default router;