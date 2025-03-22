import express from 'express';
import { getNewsByPreference, getTopHealines } from '../controller/news.js';
import { isAuthenticated } from '../middleware/auth.js';

const router = express.Router();

router.get('/', isAuthenticated, getTopHealines);
router.get('/preferences', isAuthenticated, getNewsByPreference);


export default router;