import React from 'react';
import { MapPin, Ticket, Car, Zap, DollarSign, Shield } from 'lucide-react';

const ParkingCard = ({ lot, onBook, bookingLoading }) => {
  const typeConfig = {
    free: {
      gradient: 'from-emerald-500 to-green-600',
      bg: 'bg-emerald-50',
      text: 'text-emerald-700',
      border: 'border-emerald-200',
      badge: 'bg-emerald-100 text-emerald-700 border-emerald-200',
      icon: Zap,
      shadow: 'shadow-emerald-500/10 hover:shadow-emerald-500/20',
      accent: 'bg-emerald-500',
    },
    paid: {
      gradient: 'from-blue-500 to-indigo-600',
      bg: 'bg-blue-50',
      text: 'text-blue-700',
      border: 'border-blue-200',
      badge: 'bg-blue-100 text-blue-700 border-blue-200',
      icon: DollarSign,
      shadow: 'shadow-blue-500/10 hover:shadow-blue-500/20',
      accent: 'bg-blue-500',
    },
    emergency: {
      gradient: 'from-red-500 to-rose-600',
      bg: 'bg-red-50',
      text: 'text-red-700',
      border: 'border-red-200',
      badge: 'bg-red-100 text-red-700 border-red-200',
      icon: Shield,
      shadow: 'shadow-red-500/10 hover:shadow-red-500/20',
      accent: 'bg-red-500',
    },
  };

  const type = lot.type?.toLowerCase() || 'free';
  const config = typeConfig[type] || typeConfig.free;
  const TypeIcon = config.icon;
  const isFull = lot.available_slots === 0;
  const slotsPercent = lot.total_slots > 0 ? (lot.available_slots / lot.total_slots) * 100 : 0;

  return (
    <div
      className={`group bg-white rounded-2xl border border-slate-200/80 overflow-hidden transition-all duration-300 hover:border-slate-300 hover:-translate-y-1 shadow-md ${config.shadow} hover:shadow-xl`}
      id={`parking-card-${lot.id}`}
    >
      {/* Top accent bar */}
      <div className={`h-1.5 bg-gradient-to-r ${config.gradient}`} />

      <div className="p-5">
        {/* Type badge and status */}
        <div className="flex items-center justify-between mb-4">
          <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-full border capitalize ${config.badge}`}>
            <TypeIcon size={13} />
            {lot.type}
          </span>
          {isFull ? (
            <span className="px-3 py-1 text-xs font-bold rounded-full bg-slate-100 text-slate-500 border border-slate-200">
              FULL
            </span>
          ) : (
            <span className="px-3 py-1 text-xs font-semibold rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100">
              OPEN
            </span>
          )}
        </div>

        {/* Location */}
        <h4 className="text-lg font-bold text-slate-800 flex items-start gap-2 mb-5 group-hover:text-slate-900 transition-colors leading-snug">
          <MapPin size={18} className="shrink-0 mt-0.5 text-slate-400" />
          {lot.location}
        </h4>

        {/* Slots display */}
        <div className={`${config.bg} rounded-xl p-4 mb-4 border ${config.border}`}>
          <div className="flex items-center justify-between mb-2.5">
            <span className="text-sm font-medium text-slate-500 flex items-center gap-1.5">
              <Car size={15} />
              Available Slots
            </span>
            <span className={`text-2xl font-black ${isFull ? 'text-red-500' : config.text}`}>
              {lot.available_slots}
              <span className="text-sm font-medium text-slate-400"> / {lot.total_slots}</span>
            </span>
          </div>
          {/* Progress bar */}
          <div className="w-full h-2 bg-slate-200/60 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full bg-gradient-to-r ${config.gradient} transition-all duration-700 ease-out`}
              style={{ width: `${slotsPercent}%` }}
            />
          </div>
        </div>

        {/* Book button */}
        <button
          onClick={() => onBook(lot.id)}
          disabled={isFull || bookingLoading === lot.id}
          className={`w-full py-3.5 rounded-xl font-bold flex justify-center items-center gap-2 transition-all duration-200 ${
            isFull
              ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
              : `bg-gradient-to-r ${config.gradient} text-white shadow-md hover:shadow-lg active:scale-[0.98]`
          }`}
          id={`book-btn-${lot.id}`}
        >
          {bookingLoading === lot.id ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Booking...
            </span>
          ) : (
            <>
              <Ticket size={18} />
              {isFull ? 'Sold Out' : 'Book Now'}
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default ParkingCard;
