import { Navigation } from 'lucide-react';

export function TelemetryPanel({ vehicle, onClose }) {
  const visible = !!vehicle;

  return (
    <div
      className={[
        'pointer-events-none fixed inset-x-0 bottom-0 flex justify-center',
        'transition-transform duration-300',
        visible ? 'translate-y-0' : 'translate-y-full',
        'z-[1000]',
      ].join(' ')}
    >
      <div className="pointer-events-auto mb-3 w-full max-w-2xl rounded-2xl border border-white/[0.08] bg-[rgba(18,18,18,0.98)] px-5 pb-4 pt-3 shadow-lg shadow-black/50">
        <div className="mb-2 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-white/60">
            <Navigation className="h-4 w-4 text-emerald-400" />
            <span>Live Telemetry</span>
            {vehicle && (
              <span className="font-mono text-[11px] text-white/90">
                · {vehicle.id}
              </span>
            )}
          </div>
          {vehicle && (
            <button
              type="button"
              onClick={onClose}
              className="rounded-full bg-white/10 px-2 py-0.5 text-[11px] text-white/70 hover:bg-white/15"
            >
              Close
            </button>
          )}
        </div>

        {vehicle ? (
          <div className="grid grid-cols-1 gap-4 text-xs text-white/80 sm:grid-cols-2">
            <div className="col-span-1 space-y-1">
              <p className="text-[11px] uppercase tracking-wide text-white/50">
                Coordinates
              </p>
              <div className="flex gap-4">
                <p className="font-mono">
                  Lat <span className="text-white">{vehicle.lat.toFixed(6)}</span>
                </p>
                <p className="font-mono">
                  Lng <span className="text-white">{vehicle.lng.toFixed(6)}</span>
                </p>
              </div>
              <p className="font-mono">
                Heading <span className="text-white">{Math.round(vehicle.heading)}°</span>
              </p>
            </div>

            <div className="col-span-1 space-y-1">
              <p className="text-[11px] uppercase tracking-wide text-white/50">
                Speed & Status
              </p>
              <div className="flex items-baseline gap-3">
                <p className="text-2xl font-semibold text-emerald-400">
                  {Number(vehicle.speed).toFixed(3)}
                  <span className="ml-1 text-xs text-white/60">km/h</span>
                </p>
                <p className="text-[11px] text-white/50">
                  <span className="capitalize text-white/90">{vehicle.status}</span>
                </p>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-xs text-white/50">
            Select a vehicle to inspect live telemetry.
          </p>
        )}
      </div>
    </div>
  );
}
