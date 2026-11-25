<p align="center">
  <img src=".github/gps-pin.svg" width="100" alt="GPS Location Icon" />
</p>

# Vehicle GPS Tracking System

A full-stack MERN (MongoDB, Express, React, Node.js) application for real-time monitoring and management of vehicle fleets. This system provides a live map interface, telemetry data, and automated location simulations.

## Features

- User Authentication: Secure login system using JWT and password hashing with bcrypt.
- Real-time Tracking: Live map interface powered by Leaflet to monitor vehicle locations.
- Vehicle Telemetry: Detailed information for each vehicle, including speed, heading, and status.
- Automated Simulation: Backend process that simulates vehicle movement for testing and demonstration.
- Responsive Interface: Modern dashboard design that adapts to desktop and mobile devices.
- Sidebar Navigation: Easily filter and select vehicles from a list to view their specific data.

## Tech Stack

### Frontend
- React 19
- Vite
- Tailwind CSS
- Leaflet and React-Leaflet
- Lucide React (Icons)

### Backend
- Node.js
- Express
- MongoDB with Mongoose
- JSON Web Token (JWT)
- Bcryptjs

## Project Structure

- backend/: Express server, MongoDB models, authentication logic, and simulation utility.
- frontend/: React application, components, hooks, and context providers.

## Getting Started

### Prerequisites
- Node.js installed on your machine.
- Docker and Docker Compose (for running the local MongoDB server).

### Database Setup (MongoDB via Docker)
From the project root, start the MongoDB container:
```bash
docker compose up -d
```

To stop it later:
```bash
docker compose down
```

### Backend Setup
1. Navigate to the backend directory.
2. Install dependencies: `npm install`
3. Create a `.env` file based on `.env.example` (the default `MONGODB_URI=mongodb://localhost:27017/gps-tracking` connects to the Docker MongoDB container).
4. Start the server: `npm run dev`

### Frontend Setup
1. Navigate to the frontend directory.
2. Install dependencies: `npm install`
3. Create a .env file based on .env.example and set VITE_API_URL to your backend URL (e.g., http://localhost:5000).
4. Start the development server: `npm run dev`

## API Endpoints

- POST /api/auth/register: Create a new user account.
- POST /api/auth/login: Authenticate user and receive a token.
- GET /api/gps: Retrieve real-time vehicle data (Protected route).