import { useMemo, useState } from 'react';
import { Search, ChevronRight, Car } from 'lucide-react';

const statusConfig = {
  active: {
    label: 'Moving',
    dot: 'bg-emerald-500',
    bg: 'bg-emerald-500/20',
  },
  idle: {
    label: 'Idle',
    dot: 'bg-amber-400',
    bg: 'bg-amber-400/20',
  },
  offline: {
    label: 'Offline',
    dot: 'bg-neutral-500',
    bg: 'bg-neutral-500/20',
  },
};

export function Sidebar({ vehicles, selectedId, onSelect }) {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    if (!query) return vehicles;
    const q = query.toLowerCase();
    return vehicles.filter(
      (v) =>
        v.id.toLowerCase().includes(q) ||
        (v.label && v.label.toLowerCase().includes(q)),
    );
  }, [vehicles, query]);

  return (
    <aside className="flex h-full w-full max-w-[320px] flex-col surface-dark border-r border-white/[0.08]">
      <div className="shrink-0 p-3">
        <div className="flex items-center gap-3 rounded-full bg-white/[0.08] px-4 py-2.5 text-sm text-white placeholder:text-white/40 focus-within:bg-white/[0.12] focus-within:ring-1 focus-within:ring-white/20 transition-colors">
          <Search className="h-5 w-5 shrink-0 text-white/40" strokeWidth={2} />
          <input
            type="text"
            className="min-w-0 flex-1 bg-transparent outline-none"
            placeholder="Search vehicles..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Section label */}
      <div className="shrink-0 px-4 pb-2 pt-1">
        <p className="text-xs font-medium uppercase tracking-wider text-white/50">
          Fleet · {filtered.length} units
        </p>
      </div>

      {/* List — Material-style list items */}
      <div className="flex-1 overflow-y-auto px-2 pb-4">
        {filtered.map((v) => {
          const cfg = statusConfig[v.status] ?? statusConfig.idle;
          const isSelected = v.id === selectedId;
          return (
            <button
              key={v.id}
              type="button"
              onClick={() => onSelect?.(v)}
              className={[
                'flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors',
                'hover:bg-white/[0.06] active:bg-white/[0.08]',
                isSelected && 'bg-emerald-500/15 hover:bg-emerald-500/20',
              ]
                .filter(Boolean)
                .join(' ')}
            >
              {/* Leading: status avatar */}
              <div
                className={[
                  'flex h-10 w-10 shrink-0 items-center justify-center rounded-full',
                  cfg.bg,
                ].join(' ')}
              >
                <span className={['h-2.5 w-2.5 rounded-full', cfg.dot].join(' ')} />
              </div>

              {/* Primary + secondary text */}
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-white">
                  {v.id}
                </p>
                <p className="truncate text-xs text-white/60">
                  {Number(v.speed).toFixed(3)} km/h · {cfg.label}
                </p>
              </div>

              {/* Trailing */}
              <ChevronRight
                className={[
                  'h-5 w-5 shrink-0 transition-opacity',
                  isSelected ? 'text-emerald-400' : 'text-white/40',
                ].join(' ')}
                strokeWidth={2}
              />
            </button>
          );
        })}

        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Car className="mb-3 h-10 w-10 text-white/30" strokeWidth={1.5} />
            <p className="text-sm text-white/50">No vehicles match</p>
            <p className="mt-1 text-xs text-white/40">Try a different search</p>
          </div>
        )}
      </div>
    </aside>
  );
}
