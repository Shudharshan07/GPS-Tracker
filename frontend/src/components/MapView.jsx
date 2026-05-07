import { useEffect, useMemo } from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  Tooltip,
  useMap,
} from 'react-leaflet';
import L from 'leaflet';

import 'leaflet/dist/leaflet.css';

// Fix default icon URLs in some bundlers
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: '',
  iconUrl: '',
  shadowUrl: '',
});

function makeVehicleIcon(heading) {
  const size = 28;
  const svg = `
    <svg width="${size}" height="${size}" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
      <g transform="translate(16,16) rotate(${heading}) translate(-16,-16)">
        <circle cx="16" cy="16" r="10" fill="rgba(16,185,129,0.16)" />
        <circle cx="16" cy="16" r="6" fill="#022c22" stroke="#10b981" stroke-width="1.4" />
        <polygon points="16,6 12,16 16,14 20,16" fill="#10b981" />
      </g>
    </svg>
  `;

  return L.divIcon({
    html: svg,
    className: '',
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  });
}

function FlyToSelected({ vehicle }) {
  const map = useMap();

  useEffect(() => {
    if (!vehicle) return;
    map.flyTo([vehicle.lat, vehicle.lng], 16, {
      duration: 0.8,
    });
  }, [map, vehicle]);

  return null;
}

export function MapView({ vehicles, selected }) {
  const center = useMemo(() => {
    if (selected) return [selected.lat, selected.lng];
    if (!vehicles.length) return [10.8279, 77.0605]; // Coimbatore area, India
    const avgLat =
      vehicles.reduce((s, v) => s + v.lat, 0) / vehicles.length;
    const avgLng =
      vehicles.reduce((s, v) => s + v.lng, 0) / vehicles.length;
    return [avgLat, avgLng];
  }, [vehicles, selected]);

  return (
    <div className="relative h-full w-full">
      <MapContainer
        center={center}
        zoom={15}
        minZoom={2}
        className="h-full w-full rounded-xl border border-white/[0.08] bg-black/60"
      >
        <TileLayer
          attribution='&copy; <a href="https://cartodb.com">CartoDB</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />

        {selected && <FlyToSelected vehicle={selected} />}

        {vehicles.map((v) => (
          <Marker
            // eslint-disable-next-line react/no-array-index-key
            key={v.id}
            position={[v.lat, v.lng]}
            icon={makeVehicleIcon(v.heading)}
          >
            <Tooltip direction="top" offset={[0, -12]} opacity={0.9}>
              <div className="text-[11px]">
                <div className="font-mono font-semibold text-emerald-300">
                  {v.id}
                </div>
                <div className="text-slate-200">
                  {Number(v.speed).toFixed(3)} km/h · {v.status}
                </div>
                <div className="font-mono text-slate-300">
                  {v.lat.toFixed(4)}, {v.lng.toFixed(4)}
                </div>
              </div>
            </Tooltip>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

