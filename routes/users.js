import express from 'express';
import { loginUser, registerUser, getUserPreferences, addUserPreferences } from '../controller/users.js';
import { isAuthenticated } from '../middleware/auth.js';

const router = express.Router();

router.post('/signup', registerUser)
router.post('/login', loginUser)
router.get('/preferences', isAuthenticated, getUserPreferences);
router.put('/preferences', isAuthenticated, addUserPreferences);

export default router;