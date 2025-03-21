import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { loginUser, registerUser } from '../controller/users.js';

const router = express.Router();

router.post('/signup', registerUser)

router.post('/login', loginUser)

export default router;
// Compare this snippet from routes/users.js: