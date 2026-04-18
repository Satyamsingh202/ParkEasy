import React, { useState, useEffect } from 'react';
import { getParkingLots, createParkingLot } from '../api';
import { PlusCircle, MapPin, Hash, CheckCircle2 } from 'lucide-react';

const HostDashboard = () => {
  const [parkingLots, setParkingLots] = useState([]);
  const [formData, setFormData] = useState({
    location: '',
    type: 'free',
    total_slots: 10
  });
  const [loading, setLoading] = useState(false);

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

  const handleAdd = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createParkingLot({
        ...formData,
        total_slots: parseInt(formData.total_slots)
      });
      setFormData({ location: '', type: 'free', total_slots: 10 });
      fetchParkingLots();
    } catch (err) {
      console.error(err);
      alert('Failed to add parking space');
    } finally {
      setLoading(false);
    }
  };

  const getTypeColor = (type) => {
    switch (type.toLowerCase()) {
      case 'free': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'paid': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'emergency': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-slate-100 text-slate-800';
    }
  };

  return (
<<<<<<< HEAD
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
=======
>>>>>>> main
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-3xl font-bold text-slate-800">Host Dashboard</h2>
        <p className="text-slate-500 mt-2">Manage and list your parking facilities.</p>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
          <PlusCircle size={20} className="text-blue-500" /> Add New Space
        </h3>
        <form onSubmit={handleAdd} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          <div className="flex flex-col">
            <label className="text-sm font-medium text-slate-600 mb-1">Location</label>
            <input 
              required
              type="text" 
              className="border border-slate-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="e.g., Downtown Garage A"
              value={formData.location}
              onChange={e => setFormData({...formData, location: e.target.value})}
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-medium text-slate-600 mb-1">Type</label>
            <select 
              className="border border-slate-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 outline-none capitalize"
              value={formData.type}
              onChange={e => setFormData({...formData, type: e.target.value})}
            >
              <option value="free">Free</option>
              <option value="paid">Paid</option>
              <option value="emergency">Emergency</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-medium text-slate-600 mb-1">Total Slots</label>
            <input 
              required
              type="number"
              min="1"
              className="border border-slate-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 outline-none"
              value={formData.total_slots}
              onChange={e => setFormData({...formData, total_slots: e.target.value})}
            />
          </div>
          <button 
            type="submit" 
            disabled={loading}
            className="bg-blue-600 text-white rounded-lg p-2.5 font-semibold hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? 'Adding...' : 'Add Space'}
          </button>
        </form>
      </div>

      <div>
        <h3 className="text-xl font-bold text-slate-800 mb-4">Your Facilities</h3>
        {parkingLots.length === 0 ? (
          <div className="text-center p-8 bg-slate-50 border border-slate-200 rounded-xl text-slate-500">
            No parking spaces listed yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {parkingLots.map(lot => (
              <div key={lot.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 transition-all hover:shadow-md">
                <div className="flex justify-between items-start mb-4">
                  <h4 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                    <MapPin size={18} className="text-slate-400" />
                    {lot.location}
                  </h4>
                  <span className={`px-3 py-1 text-xs font-bold rounded-full border capitalize ${getTypeColor(lot.type)}`}>
                    {lot.type}
                  </span>
                </div>
                
                <div className="flex justify-between mt-6 bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <div className="flex flex-col items-center">
                    <span className="text-slate-500 text-xs font-semibold uppercase flex items-center gap-1 mb-1">
                      <Hash size={12}/> Capacity
                    </span>
                    <span className="text-xl font-bold text-slate-700">{lot.total_slots}</span>
                  </div>
                  <div className="w-px bg-slate-200"></div>
                  <div className="flex flex-col items-center">
                    <span className="text-slate-500 text-xs font-semibold uppercase flex items-center gap-1 mb-1">
                      <CheckCircle2 size={12}/> Available
                    </span>
                    <span className={`text-xl font-bold ${lot.available_slots > 0 ? 'text-emerald-500' : 'text-red-500'}`}>
                      {lot.available_slots}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
<<<<<<< HEAD
    </div>
=======
>>>>>>> main
  );
};

export default HostDashboard;
