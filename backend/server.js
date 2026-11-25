import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { config } from './config/env.js';
import authRoutes from './routes/auth.js';
import gpsRoutes from './routes/gps.js';
import { startSimulation } from './utils/simulator.js';

const app = express();

app.use(cors({ origin: config.corsOrigins }));
app.use(express.json());

app.get('/api/health', (req, res) => {
  const dbReady = mongoose.connection.readyState === 1;
  res.status(dbReady ? 200 : 503).json({
    status: dbReady ? 'ok' : 'degraded',
    database: dbReady ? 'connected' : 'disconnected',
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/gps', gpsRoutes);

app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

app.use((err, req, res, next) => {
  const status = err.status || 500;
  res.status(status).json({ message: err.message || 'Server error' });
});

async function start() {
  try {
    console.log('Connecting to:', config.mongodbUri.replace(/:([^:@]{1,})@/, ':****@'));
    await mongoose.connect(config.mongodbUri, { family: 4 });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1);
  }

  const stopSimulation = await startSimulation(config.simulationIntervalMs);
  const server = app.listen(config.port, () => {
    console.log(`Server running on http://localhost:${config.port}`);
  });

  const shutdown = async (signal) => {
    console.log(`${signal} received, shutting down gracefully...`);
    stopSimulation();
    server.close(async () => {
      await mongoose.connection.close();
      process.exit(0);
    });
  };

  process.on('SIGINT', () => shutdown('SIGINT'));
  process.on('SIGTERM', () => shutdown('SIGTERM'));
}

start();
