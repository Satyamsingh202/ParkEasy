import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/AuthContext';
import { User, Mail, Phone, BadgeCheck, LogOut, Car, ArrowLeft } from 'lucide-react';

// Displays the authenticated user's profile details with a logout option
const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Guard: redirect unauthenticated users to the login page
  if (!user) {
    navigate('/login');
    return null;
  }

  // Wipe auth state and send user back to the landing page
  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-[calc(100vh-73px)] flex items-center justify-center px-4 py-12 bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/40">
      <div className="w-full max-w-lg">
        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-200/60 overflow-hidden">
          {/* Profile Header */}
          <div className="bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-600 px-8 pt-8 pb-12 text-center relative">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxjaXJjbGUgY3g9IjIwIiBjeT0iMjAiIHI9IjIiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4xKSIvPjwvZz48L3N2Zz4=')] opacity-50"></div>
            <div className="relative">
              <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg border border-white/30">
                <span className="text-3xl font-black text-white">{user.username?.charAt(0).toUpperCase()}</span>
              </div>
              <h2 className="text-2xl font-extrabold text-white mb-1">{user.full_name}</h2>
              <p className="text-blue-200 text-sm font-medium">@{user.username}</p>
            </div>
          </div>

          {/* Profile Details */}
          <div className="px-8 py-6 -mt-4">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm divide-y divide-slate-100">
              <div className="flex items-center gap-4 px-5 py-4">
                <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center shrink-0">
                  <BadgeCheck size={20} className="text-blue-500" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Username</p>
                  <p className="font-semibold text-slate-700 truncate">{user.username}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 px-5 py-4">
                <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center shrink-0">
                  <User size={20} className="text-indigo-500" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Full Name</p>
                  <p className="font-semibold text-slate-700 truncate">{user.full_name}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 px-5 py-4">
                <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center shrink-0">
                  <Mail size={20} className="text-emerald-500" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Email</p>
                  <p className="font-semibold text-slate-700 truncate">{user.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 px-5 py-4">
                <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center shrink-0">
                  <Phone size={20} className="text-amber-500" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Phone</p>
                  <p className="font-semibold text-slate-700">{user.phone}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="px-8 pb-8 flex gap-3">
            <button
              onClick={() => navigate(-1)}
              className="flex-1 py-3 bg-slate-100 text-slate-600 font-semibold rounded-xl hover:bg-slate-200 transition-all flex items-center justify-center gap-2 text-sm"
            >
              <ArrowLeft size={16} /> Go Back
            </button>
            <button
              onClick={handleLogout}
              className="flex-1 py-3 bg-red-50 text-red-500 font-bold rounded-xl hover:bg-red-100 transition-all flex items-center justify-center gap-2 text-sm border border-red-100"
            >
              <LogOut size={16} /> Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
