import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { X, ScanLine, CheckCircle } from 'lucide-react';

const QRModal = ({ isOpen, onClose, qrPayload }) => {
  const [scanned, setScanned] = useState(false);

  if (!isOpen) return null;

  const handleScan = () => {
    setScanned(true);
    setTimeout(() => {
      setScanned(false);
      onClose();
    }, 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-sm overflow-hidden animate-in zoom-in-95 duration-300">
        <div className="p-4 bg-slate-50 border-b border-slate-100 flex justify-between items-center">
          <h3 className="font-bold text-slate-800 text-lg">Your Parking Pass</h3>
          <button 
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-200 rounded-full transition"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="p-8 flex flex-col items-center">
          {scanned ? (
            <div className="flex flex-col items-center justify-center py-12 animate-in slide-in-from-bottom-4 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95">
              <div className="h-24 w-24 bg-emerald-100 rounded-full flex items-center justify-center mb-6 shadow-inner">
                <CheckCircle size={48} className="text-emerald-500" />
              </div>
              <h3 className="text-2xl font-black text-slate-800 text-center mb-2">Gate Opened!</h3>
              <p className="text-slate-500 text-center font-medium">Have a great day.</p>
            </div>
          ) : (
            <div className="flex flex-col items-center w-full animate-in fade-in">
              <p className="text-sm font-medium text-slate-500 mb-6 text-center">
                Show this QR code at the entrance gate scanner.
              </p>
              
              <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 mb-8 aspect-square flex items-center justify-center relative group">
                <div className="absolute inset-0 border-2 border-blue-500 rounded-2xl opacity-0 group-hover:opacity-100 group-hover:animate-ping transition pointer-events-none"></div>
                <QRCodeSVG 
                  value={qrPayload || 'invalid'} 
                  size={200}
                  level="Q"
                  includeMargin={false}
                  className="rounded-lg"
                />
              </div>

              <button 
                onClick={handleScan}
                className="w-full py-4 bg-slate-900 text-white rounded-xl font-bold flex justify-center items-center gap-2 hover:bg-slate-800 hover:shadow-lg transition-all active:scale-95"
              >
                <ScanLine size={20} />
                Simulate Gate Scan
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QRModal;
