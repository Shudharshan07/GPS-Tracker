import { Vehicle } from '../models/Vehicle.js';

const INITIAL_COORDINATES = {
  lat: 10.827948003702042,
  lng: 77.06058062289092,
};

const VEHICLES_TO_CREATE = [
  { name: 'Vehicle 001', type: 'Truck' },
  { name: 'Vehicle 002', type: 'Car' },
  { name: 'Vehicle 003', type: 'Bus' },
  { name: 'Vehicle 004', type: 'Truck' },
  { name: 'Vehicle 005', type: 'Bike' },
  { name: 'Japan Express', type: 'Car', specialLat: 35.6762, specialLng: 139.6503 },
];

export async function initializeSimulation() {
  console.log('Syncing simulation data...');
  for (const v of VEHICLES_TO_CREATE) {
    const existing = await Vehicle.findOne({ name: v.name });
    if (!existing) {
      console.log(`Creating missing vehicle: ${v.name}`);
      await Vehicle.create({
        name: v.name,
        type: v.type,
        currentLocation: {
          lat: (v.specialLat || INITIAL_COORDINATES.lat) + (Math.random() - 0.5) * 0.002,
          lng: (v.specialLng || INITIAL_COORDINATES.lng) + (Math.random() - 0.5) * 0.002,
        },
        speed: Math.floor(Math.random() * 60) + 20,
        heading: Math.floor(Math.random() * 360),
      });
    }
  }
  console.log('Simulation data synced.');
}

export async function updateVehiclePositions() {
  const vehicles = await Vehicle.find();
  const now = new Date();

  await Promise.all(
    vehicles.map((vehicle) => {
      vehicle.currentLocation.lat += (Math.random() - 0.5) * 0.0005;
      vehicle.currentLocation.lng += (Math.random() - 0.5) * 0.0005;
      vehicle.speed = Math.max(0, vehicle.speed + (Math.random() - 0.5) * 5);
      vehicle.heading = (vehicle.heading + (Math.random() - 0.5) * 20 + 360) % 360;
      vehicle.lastUpdate = now;
      return vehicle.save();
    })
  );
}

export async function startSimulation(intervalMs = 5000) {
  await initializeSimulation();

  let isUpdating = false;
  const timer = setInterval(async () => {
    if (isUpdating) return;
    isUpdating = true;
    try {
      await updateVehiclePositions();
    } catch (error) {
      console.error('Error updating vehicle positions:', error);
    } finally {
      isUpdating = false;
    }
  }, intervalMs);

  console.log(`Simulation started with interval ${intervalMs}ms`);
  return () => clearInterval(timer);
}
