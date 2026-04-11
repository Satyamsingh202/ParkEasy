import React, { useState, useEffect } from 'react';
import { getParkingLots, createBooking } from '../api';
import QRModal from '../components/QRModal';
import { MapPin, Search, Ticket, Car, Filter } from 'lucide-react';

const ClientDashboard = () => {
  const [parkingLots, setParkingLots] = useState([]);
  const [filter, setFilter] = useState('all');
  const [modalOpen, setModalOpen] = useState(false);
  const [qrPayload, setQrPayload] = useState(null);
  const [bookingLoading, setBookingLoading] = useState(null);

  useEffect(() => {
    fetchParkingLots();
  }, []);

  const fetchParkingLots = async () => {
    try {
      const data = await getParkingLots();
      setParkingLots(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleBook = async (lotId) => {
    setBookingLoading(lotId);
    try {
      const res = await createBooking(lotId);
      setQrPayload(res.qr_payload);
      setModalOpen(true);
      fetchParkingLots(); // refresh counts
    } catch (err) {
      alert(err.response?.data?.detail || 'Booking failed');
    } finally {
      setBookingLoading(null);
    }
  };

  const filteredLots = parkingLots.filter(lot => 
    filter === 'all' ? true : lot.type.toLowerCase() === filter
  );

  const getTypeColor = (type) => {
    switch (type.toLowerCase()) {
      case 'free': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'paid': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'emergency': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-slate-100 text-slate-800';
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-3xl font-bold text-slate-800 flex items-center gap-3">
          <Search className="text-blue-500" /> Find Parking
        </h2>
        <p className="text-slate-500 mt-2">Discover and book parking spaces instantly.</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-center bg-white p-4 rounded-xl shadow-sm border border-slate-200">
        <div className="flex items-center gap-2 text-slate-600 font-medium">
          <Filter size={18} /> Filter by type:
        </div>
        <div className="flex flex-wrap gap-2">
          {['all', 'free', 'paid', 'emergency'].map(t => (
            <button
              key={t}
              onClick={() => setFilter(t)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold capitalize transition-all border
                ${filter === t ? 'bg-blue-600 text-white border-blue-600 shadow-md transform scale-105' : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'}
              `}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredLots.length === 0 ? (
          <div className="col-span-full text-center p-12 bg-white border border-slate-200 rounded-2xl text-slate-500 shadow-sm mt-4">
            <Car size={48} className="mx-auto text-slate-300 mb-4" />
            <p className="text-lg">No parking spaces found for this category.</p>
          </div>
        ) : (
          filteredLots.map(lot => (
            <div key={lot.id} className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all border border-slate-200 flex flex-col group">
              <div className="flex justify-between items-start mb-4">
                <span className={`px-3 py-1 text-xs font-bold rounded-full border capitalize ${getTypeColor(lot.type)}`}>
                  {lot.type}
                </span>
                {lot.available_slots === 0 && (
                  <span className="px-3 py-1 text-xs font-bold rounded-full bg-slate-100 text-slate-500 border border-slate-200">
                    FULL
                  </span>
                )}
              </div>
              
              <h4 className="text-xl font-bold text-slate-800 flex items-center gap-2 mb-6 group-hover:text-blue-600 transition-colors">
                <MapPin size={20} className="shrink-0" />
                {lot.location}
              </h4>
              
              <div className="mt-auto">
                <div className="flex items-center justify-between bg-slate-50 p-4 rounded-xl mb-4 border border-slate-100">
                  <div className="text-sm font-medium text-slate-500">Available Slots</div>
                  <div className={`text-2xl font-black ${lot.available_slots > 0 ? 'text-emerald-500' : 'text-red-500'}`}>
                    {lot.available_slots} <span className="text-sm font-medium text-slate-400">/ {lot.total_slots}</span>
                  </div>
                </div>

                <button 
                  onClick={() => handleBook(lot.id)}
                  disabled={lot.available_slots === 0 || bookingLoading === lot.id}
                  className={`w-full py-3 rounded-xl font-bold flex justify-center items-center gap-2 transition-all shadow-sm
                    ${lot.available_slots === 0 
                      ? 'bg-slate-100 text-slate-400 cursor-not-allowed shadow-none' 
                      : 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-md hover:scale-[1.02]'}
                  `}
                >
                  {bookingLoading === lot.id ? (
                    <span className="animate-pulse">Booking...</span>
                  ) : (
                    <>
                      <Ticket size={18} /> 
                      {lot.available_slots === 0 ? 'Sold Out' : 'Book Now'}
                    </>
                  )}
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <QRModal 
        isOpen={modalOpen} 
        onClose={() => setModalOpen(false)} 
        qrPayload={qrPayload} 
      />
    </div>
  );
};

export default ClientDashboard;
