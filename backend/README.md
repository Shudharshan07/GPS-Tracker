# GPS MERN Backend

Node + Express + MongoDB API with JWT authentication and a vehicle GPS simulator.

## Setup

1. **Start MongoDB with Docker Compose** (from the repository root):
   ```bash
   docker compose up -d
   ```
   This starts a local MongoDB 7 server on `localhost:27017` with persistent storage (`mongodb_data` volume).

2. **Environment** — Copy `.env.example` to `.env` and set:
   - `MONGODB_URI` — `mongodb://localhost:27017/gps-tracking` (works out of the box with Docker Compose)
   - `JWT_SECRET` — Any long random string for signing tokens
   - `PORT` — Optional, default `5000`
   - `CORS_ORIGINS` — Optional comma-separated origins, default `http://localhost:5173,http://127.0.0.1:5173`
   - `SIMULATION_INTERVAL_MS` — Optional update interval in ms, default `5000`

3. **Install and run**:
   ```bash
   cd backend
   npm install
   npm run dev
   ```

## API

- **GET /api/health** — Returns `{ status, database }` for health checks.
- **POST /api/auth/register** — Body: `{ "email": "...", "password": "..." }`. Returns `{ user, token }`.
- **POST /api/auth/login** — Body: `{ "email": "...", "password": "..." }`. Returns `{ user, token }`.
- **GET /api/auth/me** — Header: `Authorization: Bearer <token>`. Returns `{ user }`.
- **GET /api/gps** — Header: `Authorization: Bearer <token>`. Returns the simulated vehicle array.
