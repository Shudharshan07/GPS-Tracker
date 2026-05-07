import { useEffect, useState } from 'react';
import { BASE_URL, getAuthHeaders } from '../lib/api.js';

const MOCK_VEHICLES = [
  {
    id: 'TRK-001',
    label: 'Truck 001',
    lat: 10.8279,
    lng: 77.0605,
    speed: 65,
    status: 'active',
    heading: 90,
  },
  {
    id: 'TRK-002',
    label: 'Van 002',
    lat: 10.8350,
    lng: 77.0700,
    speed: 48,
    status: 'idle',
    heading: 210,
  },
  {
    id: 'TRK-003',
    label: 'Car 003',
    lat: 10.8200,
    lng: 77.0500,
    speed: 0,
    status: 'offline',
    heading: 0,
  },
];

export function useGpsData(refreshMs = 4000) {
  const [vehicles, setVehicles] = useState(MOCK_VEHICLES);
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(null);

  useEffect(() => {
    let intervalId;

    async function fetchGpsSnapshot() {
      setIsLoading(true);
      try {
        const res = await fetch(`${BASE_URL}/gps`, {
          headers: getAuthHeaders(),
        });
        if (res.ok) {
          const json = await res.json();
          if (Array.isArray(json) && json.length > 0) {
            // Map backend data to frontend structure
            const mapped = json.map(v => ({
              id: v.name || v._id,
              label: v.name,
              lat: v.currentLocation?.lat || 10.8279,
              lng: v.currentLocation?.lng || 77.0605,
              speed: Number(v.speed || 0),
              status: (v.status || 'idle').toLowerCase(),
              heading: v.heading || 0,
            }));
            setVehicles(mapped);
            setLastUpdated(new Date());
            setIsLoading(false);
            return;
          }
        }
      } catch {
        // Fall through to mock data
      }

      setVehicles((prev) =>
        prev.map((v) => {
          if (v.status === 'offline') return v;

          const deltaLat = (Math.random() - 0.5) * 0.001;
          const deltaLng = (Math.random() - 0.5) * 0.001;

          const nextSpeed = Math.max(
            0,
            Math.min(80, v.speed + (Math.random() - 0.5) * 10),
          );

          const headingJitter = (Math.random() - 0.5) * 30;
          const nextHeading = (v.heading + headingJitter + 360) % 360;

          const nextStatus = nextSpeed > 2 ? 'active' : 'idle';

          return {
            ...v,
            lat: v.lat + deltaLat,
            lng: v.lng + deltaLng,
            speed: nextSpeed,
            heading: nextHeading,
            status: nextStatus,
          };
        }),
      );

      setLastUpdated(new Date());
      setIsLoading(false);
    }

    fetchGpsSnapshot();
    intervalId = setInterval(fetchGpsSnapshot, refreshMs);

    return () => clearInterval(intervalId);
  }, [refreshMs]);

  const activeCount = vehicles.filter((v) => v.status === 'active').length;

  return {
    vehicles,
    isLoading,
    lastUpdated,
    activeCount,
    BASE_URL,
  };
}
