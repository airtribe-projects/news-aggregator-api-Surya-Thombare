import User from '../models/users.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

if (!process.env.JWT_SECRET) {
  console.error('JWT_SECRET is required');
  process.exit(1);
}

export const registerUser = async (req, res) => {
  // Register a new user
  const { name, email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Please provide email and password' });
  }
  try {
    const user = await User
      .findOne({ email })
      .exec();
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = new User({ name, email, password: hashedPassword });
    const token = jwt.sign({ email: newUser.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Save the new user to the database
    await newUser.save();
    return res.status(201).json({ message: 'User created successfully', token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

export const loginUser = async (req, res) => {
  // Login a user
  const { email, password } = req.body;
  try {
    const user = await User
      .findOne({ email })
      .exec();
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

export const getUserPreferences = async (req, res) => {
  const { email } = req.user;
  try {
    const user = await User
      .findOne({ email })
      .exec();
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    console.log(user);

    return res.status(200).json({ preferences: user.preferences });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

export const addUserPreferences = async (req, res) => {
  const { email } = req.user;
  const { preferences } = req.body;

  if (!preferences || preferences.length === 0) {
    return res.status(400).json({ message: 'Please provide preferences' });
  }

  try {
    const user = await User
      .findOne({ email })
      .exec();
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    user.preferences = [...user.preferences, ...preferences];
    await user.save();
    return res.status(200).json({ message: 'Preferences updated successfully' });
  }
  catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
