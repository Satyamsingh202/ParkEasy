import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User, ShieldCheck } from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center space-y-12 mt-16 text-center">
      <div>
        <h2 className="text-4xl font-extrabold text-blue-900 mb-4 tracking-tight">Smart Parking Management</h2>
        <p className="text-lg text-slate-500 max-w-2xl mx-auto">Seamlessly list, discover, and book vehicle parking spaces through our automated QR-based system.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-3xl">
        <div 
          onClick={() => navigate('/host')}
          className="group flex flex-col items-center p-8 bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-xl transition-all cursor-pointer hover:border-blue-400"
        >
          <div className="bg-blue-100 p-4 rounded-full mb-6 group-hover:scale-110 transition-transform">
            <ShieldCheck size={48} className="text-blue-600" />
          </div>
          <h3 className="text-2xl font-bold text-slate-800 mb-2">I am a Host</h3>
          <p className="text-slate-500">List your available parking spaces and manage slots.</p>
        </div>

        <div 
          onClick={() => navigate('/client')}
          className="group flex flex-col items-center p-8 bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-xl transition-all cursor-pointer hover:border-emerald-400"
        >
          <div className="bg-emerald-100 p-4 rounded-full mb-6 group-hover:scale-110 transition-transform">
            <User size={48} className="text-emerald-600" />
          </div>
          <h3 className="text-2xl font-bold text-slate-800 mb-2">I am a Client</h3>
          <p className="text-slate-500">Find spaces, book a spot, and get your QR pass.</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
