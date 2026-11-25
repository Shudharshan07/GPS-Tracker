import 'dotenv/config';

const DEFAULT_CORS_ORIGINS = ['http://localhost:5173', 'http://127.0.0.1:5173'];

export const config = {
  port: Number(process.env.PORT) || 5000,
  mongodbUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/gps-tracking',
  jwtSecret: process.env.JWT_SECRET || 'dev-secret',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
  corsOrigins: process.env.CORS_ORIGINS
    ? process.env.CORS_ORIGINS.split(',').map((origin) => origin.trim()).filter(Boolean)
    : DEFAULT_CORS_ORIGINS,
  simulationIntervalMs: Number(process.env.SIMULATION_INTERVAL_MS) || 5000,
};

if (!process.env.JWT_SECRET) {
  console.warn('Warning: JWT_SECRET is not set. Using insecure development fallback.');
}
