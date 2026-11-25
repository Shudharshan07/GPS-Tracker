import express from 'express';
import { Vehicle } from '../models/Vehicle.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

// GET /api/gps — Protected route returning all tracked vehicles
router.get('/', authMiddleware, async (req, res, next) => {
  try {
    const vehicles = await Vehicle.find().sort({ name: 1 });
    res.json(vehicles);
  } catch (error) {
    next(error);
  }
});

export default router;
