import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import HostDashboard from './pages/HostDashboard';
import ClientDashboard from './pages/ClientDashboard';

function App() {
  return (
    <Router>
      <div className="min-h-screen font-sans bg-slate-50 text-slate-800">
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
            <h1 className="text-3xl font-bold tracking-tight text-blue-600 cursor-pointer" onClick={() => window.location.href="/"}>ParkEasy</h1>
          </div>
        </header>
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
