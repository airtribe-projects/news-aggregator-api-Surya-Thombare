
import express from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();



export const isAuthenticated = (req, res, next) => {
  // Check if the user is authenticated


  const authHeader = req.headers.authorization;


  const token = authHeader.split(' ')[1];

  console.log(token);
  console.log();
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: 'Unauthorized' });
  }
}