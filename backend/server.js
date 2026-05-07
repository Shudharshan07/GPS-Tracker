import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import authRoutes from './routes/auth.js';
import { authMiddleware } from './middleware/auth.js';
import { startSimulation } from './utils/simulator.js';
import { Vehicle } from './models/Vehicle.js';

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/gps-tracking';

const app = express();
app.use(cors({ origin: ['http://localhost:5173', 'http://127.0.0.1:5173'] }));
app.use(express.json());

app.use('/api/auth', authRoutes);

// Protected GPS route — requires Authorization: Bearer <token>
app.get('/api/gps', authMiddleware, async (req, res) => {
  try {
    const vehicles = await Vehicle.find();
    res.json(vehicles);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching GPS data' });
  }
});


app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message || 'Server error' });
});

async function start() {
  try {
    console.log('Connecting to:', MONGODB_URI.replace(/:([^:@]{1,})@/, ':****@'));
    await mongoose.connect(MONGODB_URI, { family: 4 });
    console.log('MongoDB connected');
  } catch (e) {
    console.error('MongoDB connection failed:', e.message);
    process.exit(1);
  }

  startSimulation(5000); // Update every 5 seconds

  app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
}

start();
