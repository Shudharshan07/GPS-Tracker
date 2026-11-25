import express from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config/env.js';
import { User } from '../models/User.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

function signToken(userId) {
  return jwt.sign({ userId }, config.jwtSecret, { expiresIn: config.jwtExpiresIn });
}

function formatUser(user) {
  return { id: user._id, email: user.email };
}

// POST /api/auth/register
router.post('/register', async (req, res, next) => {
  try {
    const email = req.body.email?.trim().toLowerCase();
    const password = req.body.password;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password required' });
    }
    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters' });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    const user = await User.create({ email, password });
    const token = signToken(user._id);
    res.status(201).json({ user: formatUser(user), token });
  } catch (err) {
    next(err);
  }
});

// POST /api/auth/login
router.post('/login', async (req, res, next) => {
  try {
    const email = req.body.email?.trim().toLowerCase();
    const password = req.body.password;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password required' });
    }

    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = signToken(user._id);
    res.json({ user: formatUser(user), token });
  } catch (err) {
    next(err);
  }
});

// GET /api/auth/me (protected)
router.get('/me', authMiddleware, (req, res) => {
  res.json({ user: req.user });
});

export default router;
