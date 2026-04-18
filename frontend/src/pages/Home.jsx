import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/AuthContext';
import { searchParkingLots, createBooking } from '../services/api';
import SearchBar from '../components/SearchBar';
import ParkingCard from '../components/ParkingCard';
import QRModal from '../components/QRModal';
import { Car, ShieldCheck, User, QrCode, Zap, MapPin, ArrowRight, Sparkles, Clock, Search, DollarSign, Shield, LayoutGrid } from 'lucide-react';

// Primary landing page combining hero, search, results grid, features, and role selection
const Home = () => {
  const navigate = useNavigate();
  // Determine whether to show auth CTAs or the logged-in experience
  const { isLoggedIn } = useAuth();

  // Stores the array of parking lots fetched from the backend
  const [parkingLots, setParkingLots] = useState([]);
  // Tracks whether a search API call is currently in-flight
  const [isLoading, setIsLoading] = useState(false);
  // Distinguishes initial load from an explicit user search
  const [hasSearched, setHasSearched] = useState(false);
  // The current text in the search bar for re-fetching after booking
  const [searchQuery, setSearchQuery] = useState('');
  // Controls the QR code modal visibility after a successful booking
  const [modalOpen, setModalOpen] = useState(false);
  // JSON string passed to the QR code generator component
  const [qrPayload, setQrPayload] = useState(null);
  // Holds the lot ID currently being booked to show per-card loading state
  const [bookingLoading, setBookingLoading] = useState(null);
  // True until the first fetch completes — drives the initial spinner
  const [initialLoad, setInitialLoad] = useState(true);
  // Filters the results grid by parking type (all/free/paid/emergency)
  const [typeFilter, setTypeFilter] = useState('all');

  // Features Data
  const features = [
    {
      icon: <QrCode size={24} className="text-blue-500" />,
      title: 'QR-Based Access',
      desc: 'Get instant QR passes for seamless parking entry',
      bg: 'bg-blue-50',
    },
    {
      icon: <Zap size={24} className="text-amber-500" />,
      title: 'Instant Booking',
      desc: 'Book your spot in seconds with one-click booking',
      bg: 'bg-amber-50',
    },
    {
      icon: <MapPin size={24} className="text-emerald-500" />,
      title: 'Live Availability',
      desc: 'See real-time slot availability across all locations',
      bg: 'bg-emerald-50',
    },
    {
      icon: <Clock size={24} className="text-violet-500" />,
      title: 'Save Time',
      desc: 'No more circling blocks — find and reserve ahead',
      bg: 'bg-violet-50',
    },
  ];

  const filterOptions = [
    { key: 'all', label: 'All', icon: LayoutGrid, colors: 'bg-slate-100 text-slate-700 border-slate-200', active: 'bg-slate-800 text-white border-slate-800 shadow-lg shadow-slate-800/25' },
    { key: 'free', label: 'Free', icon: Zap, colors: 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100', active: 'bg-emerald-600 text-white border-emerald-600 shadow-lg shadow-emerald-600/25' },
    { key: 'paid', label: 'Paid', icon: DollarSign, colors: 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100', active: 'bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-600/25' },
    { key: 'emergency', label: 'Emergency', icon: Shield, colors: 'bg-red-50 text-red-700 border-red-200 hover:bg-red-100', active: 'bg-red-600 text-white border-red-600 shadow-lg shadow-red-600/25' },
  ];

  // Pre-fetch all available parking spaces when the page first renders
  useEffect(() => {
    loadAllParking();
  }, []);

  // Fetch all parking data from backend without any location filter
  const loadAllParking = async () => {
    try {
      const data = await searchParkingLots('');
      setParkingLots(data);
    } catch (err) {
      console.error(err);
    } finally {
      setInitialLoad(false);
    }
  };

  // Triggered by the SearchBar component when user submits a location query
  const handleSearch = async (query) => {
    setSearchQuery(query);
    setIsLoading(true);
    setHasSearched(true);
    try {
      const data = await searchParkingLots(query);
      setParkingLots(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Books a slot, shows QR on success, and re-fetches to update availability counts
  const handleBook = async (lotId) => {
    setBookingLoading(lotId);
    try {
      const res = await createBooking(lotId);
      // Open the QR modal with the booking payload from the backend
      setQrPayload(res.qr_payload);
      setModalOpen(true);
      // Re-fetch parking data to reflect the decremented slot count
      const data = await searchParkingLots(searchQuery);
      setParkingLots(data);
    } catch (err) {
      alert(err.response?.data?.detail || 'Booking failed');
    } finally {
      setBookingLoading(null);
    }
  };

  // Apply the type filter pill selection to narrow displayed results
  const filteredLots = typeFilter === 'all'
    ? parkingLots
    : parkingLots.filter(l => l.type?.toLowerCase() === typeFilter);

  // Compute summary statistics shown above the results grid
  const stats = {
    total: parkingLots.length,
    free: parkingLots.filter(l => l.type?.toLowerCase() === 'free').length,
    paid: parkingLots.filter(l => l.type?.toLowerCase() === 'paid').length,
    available: parkingLots.reduce((sum, l) => sum + l.available_slots, 0),
  };

  return (
    <div className="min-h-[calc(100vh-73px)]">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/40 to-indigo-50/50 pt-16 pb-8 sm:pt-24 sm:pb-12">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-indigo-200/20 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-blue-100/20 to-violet-100/20 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-3xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white border border-blue-200/60 rounded-full px-4 py-1.5 mb-6 shadow-sm">
              <Sparkles size={14} className="text-blue-500" />
              <span className="text-xs font-semibold text-blue-600 tracking-wide uppercase">Smart Parking Solution</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 leading-[1.1] tracking-tight mb-4">
              Park{' '}
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">
                Smarter
              </span>
              ,<br />
              Not Harder
            </h1>

            <p className="text-lg sm:text-xl text-slate-500 max-w-2xl mx-auto mb-8 leading-relaxed">
              Discover, book, and access parking spaces instantly with our QR-powered system. No more circling blocks — just scan and park.
            </p>

            {/* CTA Buttons */}
            {!isLoggedIn && (
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
                <button
                  onClick={() => navigate('/signup')}
                  className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-2xl shadow-lg shadow-blue-200 hover:shadow-xl hover:shadow-blue-300 hover:scale-[1.02] transition-all flex items-center gap-2 text-lg"
                >
                  Get Started Free
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={() => navigate('/login')}
                  className="px-8 py-4 bg-white text-slate-700 font-semibold rounded-2xl border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all text-lg"
                >
                  I already have an account
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Search & Results Section */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        {/* Search Bar */}
        <div className="mb-8">
          <SearchBar onSearch={handleSearch} isLoading={isLoading} />
        </div>

        {/* Type Filter Pills */}
        <div className="flex items-center justify-center gap-2 mb-8 flex-wrap" id="type-filters">
          {filterOptions.map((opt) => {
            const Icon = opt.icon;
            const isActive = typeFilter === opt.key;
            return (
              <button
                key={opt.key}
                onClick={() => setTypeFilter(opt.key)}
                className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold border transition-all duration-200 capitalize active:scale-95 ${
                  isActive ? opt.active : opt.colors
                }`}
                id={`filter-${opt.key}`}
              >
                <Icon size={15} />
                {opt.label}
              </button>
            );
          })}
        </div>

        {/* Quick stats */}
        {!initialLoad && parkingLots.length > 0 && (
          <div className="flex items-center justify-center gap-6 mb-10 flex-wrap">
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <div className="w-2 h-2 rounded-full bg-blue-500" />
              <span><strong className="text-slate-700">{stats.total}</strong> locations</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <div className="w-2 h-2 rounded-full bg-emerald-500" />
              <span><strong className="text-slate-700">{stats.available}</strong> spots open</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <span><strong className="text-slate-700">{stats.free}</strong> free</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <div className="w-2 h-2 rounded-full bg-indigo-500" />
              <span><strong className="text-slate-700">{stats.paid}</strong> paid</span>
            </div>
          </div>
        )}

        {/* Results Section */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="relative">
              <div className="w-14 h-14 border-4 border-blue-200 rounded-full" />
              <div className="absolute top-0 left-0 w-14 h-14 border-4 border-blue-600 rounded-full border-t-transparent animate-spin" />
            </div>
            <p className="text-slate-500 mt-6 font-medium">Searching for parking spots...</p>
          </div>
        )}

        {!isLoading && !initialLoad && filteredLots.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                  {hasSearched && searchQuery ? (
                    <>
                      <Search size={22} className="text-blue-500" />
                      Results for "{searchQuery}"
                    </>
                  ) : (
                    <>
                      <MapPin size={22} className="text-blue-500" />
                      Available Parking Near You
                    </>
                  )}
                </h2>
                <p className="text-slate-500 mt-1 text-sm">
                  {filteredLots.length} parking {filteredLots.length === 1 ? 'space' : 'spaces'} found
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredLots.map((lot, index) => (
                <div key={lot.id} className="animate-fadeInUp" style={{ animationDelay: `${index * 80}ms` }}>
                  <ParkingCard lot={lot} onBook={handleBook} bookingLoading={bookingLoading} />
                </div>
              ))}
            </div>
          </div>
        )}

        {!isLoading && !initialLoad && parkingLots.length === 0 && hasSearched && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-6">
              <Car size={36} className="text-slate-300" />
            </div>
            <h3 className="text-xl font-bold text-slate-700 mb-2">No parking spots found</h3>
            <p className="text-slate-500 max-w-md">
              No parking slots available for "{searchQuery}". Try a different location or browse all available spaces.
            </p>
            <button
              onClick={() => handleSearch('')}
              className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all shadow-md"
              id="show-all-btn"
            >
              Show All Parking
            </button>
          </div>
        )}

        {!isLoading && !initialLoad && parkingLots.length === 0 && !hasSearched && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mb-6">
              <Search size={36} className="text-blue-300" />
            </div>
            <h3 className="text-xl font-bold text-slate-700 mb-2">Search to find parking</h3>
            <p className="text-slate-500 max-w-md">
              Enter a location above to discover available parking spaces near you.
            </p>
          </div>
        )}

        {initialLoad && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="relative">
              <div className="w-14 h-14 border-4 border-blue-200 rounded-full" />
              <div className="absolute top-0 left-0 w-14 h-14 border-4 border-blue-600 rounded-full border-t-transparent animate-spin" />
            </div>
            <p className="text-slate-500 mt-6 font-medium">Loading available spots...</p>
          </div>
        )}
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-800 mb-4">Why choose ParkEasy?</h2>
            <p className="text-slate-500 text-lg max-w-xl mx-auto">Everything you need for a hassle-free parking experience</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <div
                key={i}
                className="group p-6 bg-white border border-slate-200/80 rounded-2xl hover:shadow-xl hover:border-blue-200 hover:-translate-y-1 transition-all duration-300"
              >
                <div className={`w-12 h-12 ${f.bg} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  {f.icon}
                </div>
                <h3 className="text-lg font-bold text-slate-800 mb-2">{f.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Role Selection */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-800 mb-4">How do you want to use ParkEasy?</h2>
            <p className="text-slate-500 text-lg">Choose your role and get started in seconds</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            <div
              onClick={() => navigate('/host')}
              className="group flex flex-col items-center p-10 bg-white border border-slate-200 rounded-3xl shadow-sm hover:shadow-2xl transition-all cursor-pointer hover:border-blue-300 hover:-translate-y-1 duration-300"
            >
              <div className="bg-gradient-to-br from-blue-100 to-blue-50 p-5 rounded-2xl mb-6 group-hover:scale-110 transition-transform shadow-inner">
                <ShieldCheck size={48} className="text-blue-600" />
              </div>
              <h3 className="text-2xl font-extrabold text-slate-800 mb-2">I'm a Host</h3>
              <p className="text-slate-500 text-center mb-4">List your available parking spaces and manage slots effortlessly.</p>
              <span className="text-blue-600 font-semibold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                Manage Spaces <ArrowRight size={16} />
              </span>
            </div>

            <div
              onClick={() => isLoggedIn ? navigate('/client') : navigate('/signup')}
              className="group flex flex-col items-center p-10 bg-white border border-slate-200 rounded-3xl shadow-sm hover:shadow-2xl transition-all cursor-pointer hover:border-emerald-300 hover:-translate-y-1 duration-300"
            >
              <div className="bg-gradient-to-br from-emerald-100 to-emerald-50 p-5 rounded-2xl mb-6 group-hover:scale-110 transition-transform shadow-inner">
                <User size={48} className="text-emerald-600" />
              </div>
              <h3 className="text-2xl font-extrabold text-slate-800 mb-2">I'm a Client</h3>
              <p className="text-slate-500 text-center mb-4">Find spaces, book a spot, and get your instant QR parking pass.</p>
              <span className="text-emerald-600 font-semibold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                Find Parking <ArrowRight size={16} />
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Car size={20} className="text-blue-400" />
            <span className="font-bold text-white text-lg">ParkEasy</span>
          </div>
          <p className="text-sm">Built with ❤️ for Hackachinno 3</p>
        </div>
      </footer>

      {/* QR Modal */}
      <QRModal isOpen={modalOpen} onClose={() => setModalOpen(false)} qrPayload={qrPayload} />
    </div>
  );
};

export default Home;