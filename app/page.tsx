"use client";
import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { Droplets, Thermometer, Wind, AlertTriangle, ShieldCheck } from 'lucide-react';

// === GANTI DENGAN URL WEB APP GOOGLE SHEETS ANDA ===
const URL_DARI_APPS_SCRIPT = 'https://script.google.com/macros/s/AKfycbyuimpq4fT0L8aArXfQ5Hfuot3xd1iyekCLmSBXcXSLIfQXXX3RHV8kqgFQCFIFck0L/exec';

export default function PadiStorytelling() {
  const [dataSeries, setDataSeries] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await fetch(URL_DARI_APPS_SCRIPT);
      const result = await response.json();
      // Mengurutkan data agar kronologis
      setDataSeries(result);
      setLoading(false);
    } catch (error) {
      console.error("Gagal menjemput data Semar:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 60000); // Auto-refresh setiap 1 menit
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center">
        <div className="relative h-24 w-24 mb-4">
          <div className="absolute inset-0 rounded-full border-t-4 border-emerald-500 animate-spin"></div>
          <div className="absolute inset-2 rounded-full border-t-4 border-blue-500 animate-spin-slow"></div>
        </div>
        <p className="text-emerald-400 font-black tracking-[0.3em] animate-pulse">MEMANGGIL ELEMEN SEMAR...</p>
      </div>
    );
  }

  const latest = dataSeries.length > 0 ? dataSeries[dataSeries.length - 1] : { temp: 0, hum: 0, label: 'Data Kosong', pump: 'OFF' };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-4 md:p-8 font-sans selection:bg-emerald-500/30">
      {/* Background Layer */}
      <div className="fixed inset-0 z-0 opacity-20 pointer-events-none" 
           style={{backgroundImage: `url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=2000&q=80')`, 
           backgroundSize: 'cover', backgroundPosition: 'center', filter: 'blur(10px)'}} />
      
      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header Section */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div className="space-y-2">
            <h1 className="text-5xl font-black tracking-tighter italic bg-clip-text text-transparent bg-gradient-to-r from-white to-white/40">PADI 2026</h1>
            <div className="flex items-center gap-3">
              <span className={`h-2 w-2 rounded-full animate-ping ${latest.pump === 'ON' ? 'bg-blue-500' : 'bg-emerald-500'}`} />
              <p className="text-[10px] uppercase tracking-[0.4em] font-bold text-emerald-400">Pusat Intelijen Lahan AgroEduLabs</p>
            </div>
          </div>
          <div className="group border-[1px] border-white/20 px-8 py-3 backdrop-blur-3xl bg-white/5 hover:bg-white/10 transition-all cursor-crosshair">
            <span className="text-2xl font-black tracking-[0.5em] group-hover:tracking-[0.6em] transition-all">OYOD</span>
          </div>
        </header>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Status Card */}
          <div className={`p-6 rounded-2xl border backdrop-blur-xl transition-all duration-500 ${latest.temp > 32 ? 'bg-red-500/10 border-red-500/50' : 'bg-emerald-500/10 border-emerald-500/50'}`}>
            <div className="flex justify-between items-start mb-4">
              <p className="text-[10px] font-bold uppercase tracking-widest opacity-60 italic">Status Lahan</p>
              {latest.temp > 32 ? <AlertTriangle className="text-red-500 h-5 w-5" /> : <ShieldCheck className="text-emerald-500 h-5 w-5" />}
            </div>
            <h2 className="text-2xl font-black tracking-tight leading-tight">{latest.label}</h2>
          </div>

          {/* Temperature Card */}
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl">
            <div className="flex justify-between items-start mb-4 text-red-400">
              <p className="text-[10px] font-bold uppercase tracking-widest opacity-60">Hawa Api (Banas Pati)</p>
              <Thermometer className="h-5 w-5" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-5xl font-light tracking-tighter tabular-nums">{latest.temp}</span>
              <span className="text-xl font-light opacity-40">°C</span>
            </div>
          </div>

          {/* Humidity Card */}
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl">
            <div className="flex justify-between items-start mb-4 text-blue-400">
              <p className="text-[10px] font-bold uppercase tracking-widest opacity-60">Elemen Air (Semar)</p>
              <Droplets className="h-5 w-5" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-5xl font-light tracking-tighter tabular-nums">{latest.hum}</span>
              <span className="text-xl font-light opacity-40">%</span>
            </div>
          </div>
        </div>

        {/* Recharts "Battle Journal" Section */}
        <div className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8 mb-12 backdrop-blur-md">
          <div className="flex items-center gap-3 mb-10 border-b border-white/5 pb-4">
            <Wind className="text-white/20 h-4 w-4" />
            <h3 className="text-[10px] font-black opacity-40 uppercase tracking-[0.4em]">Buku Harian Perlawanan Lahan</h3>
          </div>
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={dataSeries}>
                <defs>
                  <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorHum" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                <XAxis dataKey="time" stroke="#ffffff20" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis stroke="#ffffff20" fontSize={10} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{backgroundColor: '#0f172a', border: '1px solid #ffffff10', borderRadius: '12px'}}
                  itemStyle={{fontSize: '12px', fontWeight: 'bold'}}
                />
                <Area type="monotone" dataKey="temp" stroke="#ef4444" strokeWidth={3} fillOpacity={1} fill="url(#colorTemp)" name="Suhu (°C)" />
                <Area type="monotone" dataKey="hum" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorHum)" name="Lembab (%)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Footer & Meta Info */}
        <footer className="flex flex-col md:flex-row justify-between items-center gap-8 opacity-30 text-[9px] uppercase tracking-[0.5em] pt-8 border-t border-white/5">
          <p>Deployment Handbook v2.0.8</p>
          <div className="flex gap-4">
            <span>Kendal</span>
            <span>•</span>
            <span>Soropadan</span>
          </div>
          <p>© 2026 AGROEDULABS x OYOD</p>
        </footer>
      </div>
    </div>
  );
}
