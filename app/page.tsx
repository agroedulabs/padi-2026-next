"use client";
import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

// === GANTI URL DI BAWAH INI DENGAN URL WEB APP GOOGLE SHEETS ANDA ===
const YOUR_SHEET_URL = 'https://script.google.com/macros/s/AKfycbyuimpq4fT0L8aArXfQ5Hfuot3xd1iyekCLmSBXcXSLIfQXXX3RHV8kqgFQCFIFck0L/exec';

export default function PadiStorytelling() {
  const [dataSeries, setDataSeries] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fungsi untuk mengambil data dari Google Sheets
  const fetchData = async () => {
    try {
      const response = await fetch(YOUR_SHEET_URL);
      const result = await response.json();
      setDataSeries(result);
      setLoading(false);
    } catch (error) {
      console.error("Gagal memanggil elemen data Semar:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // Dashboard akan otomatis update setiap 1 menit (60.000 ms)
    const interval = setInterval(fetchData, 60000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500 mb-4 mx-auto"></div>
          <p className="text-emerald-400 italic tracking-widest text-xs uppercase">Memanggil Bantuan Semar...</p>
        </div>
      </div>
    );
  }

  // Ambil data terbaru untuk kartu indikator
  const latestData = dataSeries.length > 0 ? dataSeries[dataSeries.length - 1] : { temp: 0, hum: 0, label: 'No Data' };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-4 md:p-8 font-sans relative overflow-hidden">
      {/* Background Sawah */}
      <div className="fixed inset-0 z-0 opacity-20" style={{backgroundImage: `url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=2000&q=80')`, backgroundSize: 'cover', backgroundPosition: 'center', filter: 'blur(8px)'}} />
      
      <div className="relative z-10 max-w-6xl mx-auto">
        <header className="flex justify-between items-start mb-10">
          <div>
            <h1 className="text-4xl font-black tracking-tighter italic text-white">PADI 2026</h1>
            <p className="text-emerald-400 font-bold uppercase tracking-[0.3em] text-[10px]">AgroEduLabs Command Center</p>
          </div>
          <div className="bg-white/5 border border-white/20 px-4 py-2">
            <span className="font-black tracking-widest text-xl">OYOD</span>
          </div>
        </header>

        {/* Indikator Real-Time */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-xl">
            <p className="text-[10px] text-emerald-400 font-bold uppercase mb-4">Status Lahan</p>
            <h2 className="text-2xl font-bold">{latestData.label}</h2>
          </div>
          <div className="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-xl">
            <p className="text-[10px] text-red-400 font-bold uppercase mb-4">Suhu (Banas Pati)</p>
            <p className="text-4xl font-mono">{latestData.temp}°C</p>
          </div>
          <div className="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-xl">
            <p className="text-[10px] text-blue-400 font-bold uppercase mb-4">Kelembaban (Semar)</p>
            <p className="text-4xl font-mono">{latestData.hum}%</p>
          </div>
        </div>

        {/* Grafik Medan Perang */}
        <div className="bg-white/5 border border-white/10 rounded-3xl p-6 mb-12 backdrop-blur-md">
          <h3 className="text-[10px] font-bold opacity-40 uppercase tracking-widest mb-8 text-center">Riwayat Perlawanan Lahan</h3>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={dataSeries}>
                <defs>
                  <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorHum" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                <XAxis dataKey="time" stroke="#ffffff40" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis stroke="#ffffff40" fontSize={10} tickLine={false} axisLine={false} />
