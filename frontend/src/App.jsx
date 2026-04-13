import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import HostDashboard from './pages/HostDashboard';
import ClientDashboard from './pages/ClientDashboard';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen font-sans bg-slate-50 text-slate-800">
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/host" element={<HostDashboard />} />
              <Route path="/client" element={<ClientDashboard />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
