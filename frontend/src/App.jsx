import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Menu, Car } from 'lucide-react';
import Home from './pages/Home';
import HostDashboard from './pages/HostDashboard';
import ClientDashboard from './pages/ClientDashboard';
import Sidebar from './components/Sidebar';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <Router>
      <div className="min-h-screen font-sans bg-slate-50 text-slate-800">
        {/* Header */}
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-slate-200/60 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
            {/* Left: Menu + Logo */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen(true)}
                className="p-2.5 rounded-xl text-slate-500 hover:text-slate-700 hover:bg-slate-100 transition-all active:scale-95"
                id="menu-btn"
                aria-label="Open menu"
              >
                <Menu size={22} />
              </button>
              <div
                className="flex items-center gap-2.5 cursor-pointer"
                onClick={() => window.location.href = '/'}
              >
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/25">
                  <Car size={18} className="text-white" />
                </div>
                <h1 className="text-2xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent tracking-tight">
                  ParkEasy
                </h1>
              </div>
            </div>

            {/* Right: optional future items */}
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-emerald-50 border border-emerald-200 rounded-full text-xs font-semibold text-emerald-700">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Live
              </div>
            </div>
          </div>
        </header>

        {/* Sidebar */}
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        {/* Main Content */}
        <main>
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/host" element={<HostDashboard />} />
              <Route path="/client" element={<ClientDashboard />} />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  );
}

export default App;
