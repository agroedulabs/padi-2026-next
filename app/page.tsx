import React, { useState, useEffect } from 'react';
import Head from 'next/head';

export default function PadiDashboard() {
  // Simulasi data real-time (bisa kita hubungkan ke API Kendal/Soropadan nanti)
  const [temp, setTemp] = useState(24.5);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setTemp(prev => +(prev + (Math.random() * 0.2 - 0.1)).toFixed(1));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 selection:bg-emerald-500/30">
      <Head>
        <title>PADI 2026 | Command Center</title>
        <meta name="description" content="AgroEduLabs Monitoring System" />
      </Head>

      {/* Background Layer - Versi Next.js dengan Sawah Soropadan */}
      <div 
        className="fixed inset-0 z-0 opacity-40 scale-105"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=2000&q=80')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(8px)'
        }}
      />

      {/* Overlay Gradasi agar Teks Terbaca Tajam */}
      <div className="fixed inset-0 z-0 bg-gradient-to-b from-slate-950/80 via-transparent to-slate-950/90" />

      <main className="relative z-10 p-6 md:p-12 max-w-7xl mx-auto min-h-screen flex flex-col">
        
        {/* Header - Identitas OYOD x AgroEduLabs */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-16">
          <div className="space-y-2">
            <h1 className="text-5xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white to-white/40">
              PADI 2026
            </h1>
            <div className="flex items-center gap-3">
              <span className="flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <p className="text-[10px] uppercase tracking-[0.4em] font-bold text-emerald-400">
                Live Monitoring System
              </p>
            </div>
          </div>
          
          <div className="group border-[1px] border-white/20 px-8 py-3 backdrop-blur-3xl bg-white/5 hover:bg-white/10 transition-all cursor-crosshair">
            <span className="text-2xl font-black tracking-[0.5em] group-hover:tracking-[0.6em] transition-all">OYOD</span>
          </div>
        </header>

        {/* Monitoring Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-auto">
          
          {/* Kendal Panel */}
          <div className="group relative p-8 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md hover:border-emerald-500/50 transition-all duration-500">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-100 transition-opacity">
              <div className="w-12 h-12 border-t-2 border-r-2 border-emerald-500" />
            </div>
            <p className="text-[10px] uppercase tracking-widest text-white/40 mb-10 font-bold">Site: Kendal / Temperature</p>
            <div className="flex items-baseline gap-3">
              <span className="text-7xl font-light tracking-tighter tabular-nums">{temp}</span>
              <span className="text-2xl font-extralight text-emerald-500/60">°C</span>
            </div>
            <p className="mt-10 text-[10px] uppercase tracking-widest text-emerald-400/70">● Kondisi Optimal</p>
          </div>

          {/* Soropadan Panel */}
          <div className="group relative p-8 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md hover:border-purple-500/50 transition-all duration-500">
            <p className="text-[10px] uppercase tracking-widest text-white/40 mb-10 font-bold">Site: Soropadan / Humidity</p>
            <div className="flex items-baseline gap-3">
              <span className="text-7xl font-light tracking-tighter tabular-nums text-purple-100">88</span>
              <span className="text-2xl font-extralight text-purple-500/60">%</span>
            </div>
            <p className="mt-10 text-[10px] uppercase tracking-widest text-purple-400/70">Kelembaban Tinggi</p>
          </div>

          {/* Bawang Merah Panel */}
          <div className="group relative p-8 rounded-2xl bg-purple-500/[0.05] border border-purple-500/20 backdrop-blur-md transition-all duration-500">
            <p className="text-[10px] uppercase tracking-widest text-purple-300/40 mb-10 font-bold">Production: Shallot</p>
            <div className="flex items-baseline gap-3">
              <span className="text-7xl font-light tracking-tighter">1.2</span>
              <span className="text-2xl font-extralight text-purple-500/60">Tons</span>
            </div>
            <div className="mt-10 pt-6 border-t border-white/5 text-[11px] italic text-white/30 font-serif leading-relaxed">
              "Berakar, Bergerak, Berarti"
            </div>
          </div>

        </div>

        {/* Footer info */}
        <footer className="mt-20 flex flex-col md:flex-row justify-between items-end gap-8 border-t border-white/5 pt-10 pb-4">
          <div className="space-y-2">
            <p className="text-[10px] uppercase tracking-widest text-white/20 font-bold">Project Status</p>
            <p className="text-xs text-white/40">Sistem terintegrasi dengan AgroEduLabs. Deployment v2.0.4 - 2026</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] uppercase tracking-widest text-white/20 font-bold mb-2">Location Data</p>
            <p className="text-xs text-emerald-500/40 tracking-tighter">7.0165° S, 110.2035° E (Central Java)</p>
          </div>
        </footer>
      </main>
    </div>
  );
}
