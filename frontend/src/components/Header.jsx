import { Activity, Map as MapIcon, Navigation, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';

function formatTime(date) {
  if (!date) return '--:--:--';
  return date.toLocaleTimeString();
}

export function Header({ totalActive, lastUpdated, user }) {
  const { logout } = useAuth();
  const now = new Date();

  return (
    <header className="flex items-center justify-between border-b border-white/[0.08] surface-dark px-6 py-3">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-400">
          <Navigation className="h-5 w-5" strokeWidth={2} />
        </div>
        <div>
          <h1 className="text-base font-medium text-white">
            GPS Tracking
          </h1>
          {user?.email && (
            <p className="text-xs text-white/50">{user.email}</p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-6 text-xs">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/[0.08]">
            <Activity className="h-4 w-4 text-emerald-400" strokeWidth={2} />
          </div>
          <div>
            <p className="text-white/60">Active</p>
            <p className="font-medium text-emerald-400">{totalActive}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/[0.08]">
            <MapIcon className="h-4 w-4 text-white/70" strokeWidth={2} />
          </div>
          <div>
            <p className="text-white/60">Status</p>
            <p className="font-medium text-emerald-400">Online</p>
          </div>
        </div>

        <div className="hidden items-center gap-2 sm:flex">
          <div className="rounded-lg bg-white/[0.08] px-3 py-1.5 font-mono text-sm text-white/90">
            {now.toLocaleTimeString()}
          </div>
          <p className="text-[10px] text-white/50">
            Updated {formatTime(lastUpdated)}
          </p>
        </div>

        <button
          type="button"
          onClick={logout}
          className="flex items-center gap-2 rounded-lg bg-white/[0.08] px-3 py-2 text-xs text-white/80 hover:bg-white/[0.12] hover:text-white transition-colors"
          title="Sign out"
        >
          <LogOut className="h-4 w-4" strokeWidth={2} />
          Sign out
        </button>
      </div>
    </header>
  );
}

