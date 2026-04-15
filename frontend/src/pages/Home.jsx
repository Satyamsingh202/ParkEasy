import React, { useState, useEffect } from 'react';
import { searchParkingLots, createBooking } from '../api';
import SearchBar from '../components/SearchBar';
import ParkingCard from '../components/ParkingCard';
import QRModal from '../components/QRModal';
import { Car, MapPin, Sparkles, Search, ArrowDown, Zap, DollarSign, Shield, LayoutGrid } from 'lucide-react';

const Home = () => {
  const [parkingLots, setParkingLots] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [qrPayload, setQrPayload] = useState(null);
  const [bookingLoading, setBookingLoading] = useState(null);
  const [initialLoad, setInitialLoad] = useState(true);
  const [typeFilter, setTypeFilter] = useState('all');

  // Load all parking on mount
  useEffect(() => {
    loadAllParking();
  }, []);

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

  const handleBook = async (lotId) => {
    setBookingLoading(lotId);
    try {
      const res = await createBooking(lotId);
      setQrPayload(res.qr_payload);
      setModalOpen(true);
      // Refresh parking data
      const data = await searchParkingLots(searchQuery);
      setParkingLots(data);
    } catch (err) {
      alert(err.response?.data?.detail || 'Booking failed');
    } finally {
      setBookingLoading(null);
    }
  };

  const filteredLots = typeFilter === 'all'
    ? parkingLots
    : parkingLots.filter(l => l.type?.toLowerCase() === typeFilter);

  const stats = {
    total: parkingLots.length,
    free: parkingLots.filter(l => l.type?.toLowerCase() === 'free').length,
    paid: parkingLots.filter(l => l.type?.toLowerCase() === 'paid').length,
    available: parkingLots.reduce((sum, l) => sum + l.available_slots, 0),
  };

  const filterOptions = [
    { key: 'all', label: 'All', icon: LayoutGrid, colors: 'bg-slate-100 text-slate-700 border-slate-200', active: 'bg-slate-800 text-white border-slate-800 shadow-lg shadow-slate-800/25' },
    { key: 'free', label: 'Free', icon: Zap, colors: 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100', active: 'bg-emerald-600 text-white border-emerald-600 shadow-lg shadow-emerald-600/25' },
    { key: 'paid', label: 'Paid', icon: DollarSign, colors: 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100', active: 'bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-600/25' },
    { key: 'emergency', label: 'Emergency', icon: Shield, colors: 'bg-red-50 text-red-700 border-red-200 hover:bg-red-100', active: 'bg-red-600 text-white border-red-600 shadow-lg shadow-red-600/25' },
  ];

  return (
    <div className="min-h-[calc(100vh-80px)]">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-8 pb-12 px-4">
        {/* Decorative background elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-gradient-to-b from-blue-100/40 via-indigo-50/30 to-transparent rounded-full blur-3xl -z-10" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-100/30 rounded-full blur-3xl -z-10" />
        <div className="absolute top-40 right-10 w-60 h-60 bg-purple-100/30 rounded-full blur-3xl -z-10" />

        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-100 rounded-full text-sm font-semibold text-blue-600 mb-6">
            <Sparkles size={16} />
            Smart Parking Made Simple
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 mb-4 leading-tight tracking-tight">
            Find & Book{' '}
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Parking
            </span>
            <br />
            in Seconds
          </h1>

          <p className="text-lg sm:text-xl text-slate-500 max-w-2xl mx-auto mb-10 leading-relaxed">
            Discover available parking spots near you, book instantly, and access with a QR code pass. No hassle, no waiting.
          </p>

          {/* Search Bar */}
          <SearchBar onSearch={handleSearch} isLoading={isLoading} />

          {/* Type Filter Pills */}
          <div className="flex items-center justify-center gap-2 mt-5 flex-wrap" id="type-filters">
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
            <div className="flex items-center justify-center gap-6 mt-8 flex-wrap">
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
        </div>
      </section>

      {/* Results Section */}
      <section className="max-w-7xl mx-auto px-4 pb-16" id="results-section">
        {/* Loading state */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="relative">
              <div className="w-14 h-14 border-4 border-blue-200 rounded-full" />
              <div className="absolute top-0 left-0 w-14 h-14 border-4 border-blue-600 rounded-full border-t-transparent animate-spin" />
            </div>
            <p className="text-slate-500 mt-6 font-medium">Searching for parking spots...</p>
          </div>
        )}

        {/* Initial empty state - show all available */}
        {!isLoading && !initialLoad && filteredLots.length > 0 && (
          <div>
            {/* Section header */}
            <div className="flex items-center justify-between mb-6">
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

            {/* Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredLots.map((lot, index) => (
                <div
                  key={lot.id}
                  className="animate-fadeInUp"
                  style={{ animationDelay: `${index * 80}ms` }}
                >
                  <ParkingCard
                    lot={lot}
                    onBook={handleBook}
                    bookingLoading={bookingLoading}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* No results after search */}
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

        {/* No results at all (empty DB) */}
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

        {/* Initial loading */}
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

      {/* QR Modal */}
      <QRModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        qrPayload={qrPayload}
      />
    </div>
  );
};

export default Home;
