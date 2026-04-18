"use client";

import React, { useState, useEffect } from 'react';

export default function PadiDashboard() {
  const [temp, setTemp] = useState(24.5);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setTemp(prev => +(prev + (Math.random() * 0.2 - 0.1)).toFixed(1));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    // Pastikan memakai 'relative' dan 'z-10' agar konten tidak tertutup
    <div className="min-h-screen w-full bg-black text-white selection:bg-emerald-500/30 font-sans relative">
      
      {/* Background Sawah dengan Overlay yang lebih terang agar tidak hitam total */}
      <div 
        className="fixed inset-0 z-0 opacity-50"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.5), rgba(0,0,0,0.8)), 
                           url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=2000&q=80')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* Konten Utama */}
      <main className="relative z-10 p-6 md:p-12 max-w-7xl mx-auto flex flex-col min-h-screen">
        
        {/* Header */}
        <header className="flex justify-between items-center mb-16">
          <div className="space-y-1">
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter italic">PADI 2026</h1>
            <p className="text-[10px] uppercase tracking-[0.4em] font-bold text-emerald-400">Live Command Center</p>
          </div>
          <div className="border-2 border-white px-6 py-2 bg-white/5 backdrop-blur-md">
            <span className="text-xl font-black tracking-[0.3em]">OYOD</span>
          </div>
        </header>

        {/* Data Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          
          {/* Kendal Panel */}
          <div className="p-8 rounded-xl bg-white/10 border border-white/20 backdrop-blur-xl hover:bg-white/15 transition-all">
            <p className="text-[10px] uppercase tracking-widest text-white/40 mb-8 font-bold text-emerald-300">Site: Kendal</p>
            <div className="flex items-baseline gap-2">
              <span className="text-6xl font-light tracking-tighter">{temp}</span>
              <span className="text-xl font-light text-white/40">°C</span>
            </div>
            <div className="mt-8 text-[10px] uppercase tracking-widest font-bold opacity-60">Status: Active</div>
          </div>

          {/* Soropadan Panel */}
          <div className="p-8 rounded-xl bg-white/10 border border-white/20 backdrop-blur-xl hover:bg-white/15 transition-all text-purple-200">
            <p className="text-[10px] uppercase tracking-widest text-white/40 mb-8 font-bold">Site: Soropadan</p>
            <div className="flex items-baseline gap-2">
              <span className="text-6xl font-light tracking-tighter">88</span>
              <span className="text-xl font-light text-white/40">%</span>
            </div>
            <div className="mt-8 text-[10px] uppercase tracking-widest font-bold opacity-60 text-purple-400">Moisture: High</div>
          </div>

          {/* Shallot Yield */}
          <div className="p-8 rounded-xl bg-purple-900/20 border border-purple-500/30 backdrop-blur-xl">
            <p className="text-[10px] uppercase tracking-widest text-purple-300/60 mb-8 font-bold">Yield: Shallot</p>
            <div className="flex items-baseline gap-2">
              <span className="text-6xl font-light tracking-tighter">1.2</span>
              <span className="text-xl font-light text-white/40">Tons</span>
            </div>
            <p className="mt-8 text-xs italic text-white/30 border-t border-white/5 pt-4">"Berakar, Bergerak, Berarti"</p>
          </div>

        </div>

        {/* Footer */}
        <footer className="mt-auto opacity-30 text-[9px] uppercase tracking-[0.4em] flex justify-between pt-8 border-t border-white/5">
          <span>AgroEduLabs x PADI 2026</span>
          <span>Deployment Handbook v2.0</span>
        </footer>
      </main>
    </div>
  );
}
