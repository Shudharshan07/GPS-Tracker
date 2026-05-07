import './index.css';
import { useState } from 'react';
import { useAuth } from './context/AuthContext.jsx';
import { Login } from './components/Login.jsx';
import { Header } from './components/Header.jsx';
import { Sidebar } from './components/Sidebar.jsx';
import { MapView } from './components/MapView.jsx';
import { TelemetryPanel } from './components/TelemetryPanel.jsx';
import { useGpsData } from './hooks/useGpsData.js';

function App() {
  const { user, loading } = useAuth();
  const { vehicles, activeCount, lastUpdated } = useGpsData();
  const [selected, setSelected] = useState(null);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black text-white/60">
        Loading...
      </div>
    );
  }

  if (!user) {
    return <Login />;
  }

  return (
    <div className="flex h-screen flex-col bg-black text-white">
      <Header totalActive={activeCount} lastUpdated={lastUpdated} user={user} />

      <main className="flex min-h-0 flex-1 gap-0 bg-black px-0 pb-2 pt-1">
        <div className="hidden h-full md:block w-72">
          <Sidebar
            vehicles={vehicles}
            selectedId={selected?.id}
            onSelect={setSelected}
          />
        </div>

        <div className="flex h-full flex-1 flex-col rounded-xl border border-white/[0.08] surface-black p-2 md:ml-2">
            <div className="flex-1 overflow-hidden">
              <MapView vehicles={vehicles} selected={selected} />
            </div>

            <div className="block h-full md:hidden">
              <Sidebar
                vehicles={vehicles}
                selectedId={selected?.id}
                onSelect={setSelected}
              />
            </div>
        </div>
      </main>

      <TelemetryPanel vehicle={selected} onClose={() => setSelected(null)} />
    </div>
  );
}

export default App;
