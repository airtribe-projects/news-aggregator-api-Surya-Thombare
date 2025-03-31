import express from 'express';
import { getTopHealines } from '../controller/news.js';
import { isAuthenticated } from '../middleware/auth.js';

const router = express.Router();

router.get('/', isAuthenticated, getTopHealines);



export default router;