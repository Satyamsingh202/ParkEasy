import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Car, ShieldCheck, User, QrCode, Zap, MapPin, ArrowRight, Sparkles, Clock } from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

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

  return (
    <div className="min-h-[calc(100vh-73px)]">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/40 to-indigo-50/50 pt-16 pb-24 sm:pt-24 sm:pb-32">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-indigo-200/20 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-blue-100/20 to-violet-100/20 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-3xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white border border-blue-200/60 rounded-full px-4 py-1.5 mb-8 shadow-sm">
              <Sparkles size={14} className="text-blue-500" />
              <span className="text-xs font-semibold text-blue-600 tracking-wide uppercase">Smart Parking Solution</span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-slate-900 leading-[1.1] tracking-tight mb-6">
              Park{' '}
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">
                Smarter
              </span>
              ,<br />
              Not Harder
            </h1>

            <p className="text-lg sm:text-xl text-slate-500 max-w-2xl mx-auto mb-10 leading-relaxed">
              Discover, book, and access parking spaces instantly with our QR-powered system. No more circling blocks — just scan and park.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              {isLoggedIn ? (
                <button
                  onClick={() => navigate('/client')}
                  className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-2xl shadow-lg shadow-blue-200 hover:shadow-xl hover:shadow-blue-300 hover:scale-[1.02] transition-all flex items-center gap-2 text-lg"
                >
                  Go to Dashboard
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>
              ) : (
                <>
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
                </>
              )}
            </div>
          </div>
        </div>
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
    </div>
  );
};

export default Home;
