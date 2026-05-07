# GPS MERN Backend

Node + Express + MongoDB API with JWT auth.

## Setup

1. **MongoDB** — Run MongoDB locally (e.g. `mongod`) or use MongoDB Atlas and set `MONGODB_URI` in `.env`.

2. **Environment** — Copy `.env.example` to `.env` and set:
   - `MONGODB_URI` — e.g. `mongodb://localhost:27017/gps-tracking`
   - `JWT_SECRET` — Any long random string for signing tokens
   - `PORT` — Optional, default 5000

3. **Install and run**:
   ```bash
   cd backend
   npm install
   npm run dev
   ```

## API

- **POST /api/auth/register** — Body: `{ "email": "...", "password": "..." }`. Returns `{ user, token }`.
- **POST /api/auth/login** — Body: `{ "email": "...", "password": "..." }`. Returns `{ user, token }`.
- **GET /api/auth/me** — Header: `Authorization: Bearer <token>`. Returns `{ user }`.
- **GET /api/gps** — Header: `Authorization: Bearer <token>`. Returns vehicle array (currently `[]`; add your data source here).

Frontend stores the token in `localStorage` under `gps_token` and sends it on every `/api/gps` request.
