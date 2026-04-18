"use client";
import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// === GANTI DENGAN URL WEB APP GOOGLE SHEETS ANDA ===
const URL_SHEET = 'https://script.google.com/macros/s/AKfycbyuimpq4fT0L8aArXfQ5Hfuot3xd1iyekCLmSBXcXSLIfQXXX3RHV8kqgFQCFIFck0L/exec';

export default function PadiCommandCenter() {
  const [allData, setAllData] = useState([]);
  const [activeSite, setActiveSite] = useState('PADI-PANTI-KND');
  const [loading, setLoading] = useState(true);

  // Data BMKG Statis sebagai pembanding
  const dataBMKG = { temp: 32, hum: 60 };

  const fetchData = async () => {
    try {
      const res = await fetch(URL_SHEET);
      const data = await res.json();
      setAllData(data);
      setLoading(false);
    } catch (err) {
      console.error("Gagal ambil data:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const inv = setInterval(fetchData, 60000);
    return () => clearInterval(inv);
  }, []);

  const filteredData = allData.filter((item: any) => item.id_alat === activeSite);
  const latest = filteredData.length > 0 ? filteredData[filteredData.length - 1] : { temp: 0, hum: 0, label: 'Menunggu Data...', pump: 'OFF' };

  if (loading) return <div className="min-h-screen bg-slate-950 flex items-center justify-center text-emerald-500 font-bold animate-pulse">SINKRONISASI DATA SEMAR...</div>;

  return (
    <div className="min-h-screen bg-slate-950 text-white p-4 md:p-10 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header & Site Switcher */}
        <header className="flex flex-col md:flex-row justify-between items-center gap-6 border-b border-white/10 pb-8">
          <div>
            <h1 className="text-5xl font-black italic tracking-tighter">PADI 2026</h1>
            <p className="text-emerald-400 text-[10px] font-bold uppercase tracking-[0.4em]">Kendal - Soropadan Command Center</p>
          </div>
          
          <div className="flex bg-white/5 p-1 rounded-xl border border-white/10">
            <button 
              onClick={() => setActiveSite('PADI-PANTI-KND')}
              className={`px-4 py-2 rounded-lg text-[10px] font-bold transition-all ${activeSite === 'PADI-PANTI-KND' ? 'bg-emerald-500 text-black' : 'hover:bg-white/5'}`}
            >
              SITE: PANTI (KND)
            </button>
            <button 
              onClick={() => setActiveSite('PADI-SRP-01')}
              className={`px-4 py-2 rounded-lg text-[10px] font-bold transition-all ${activeSite === 'PADI-SRP-01' ? 'bg-emerald-500 text-black' : 'hover:bg-white/5'}`}
            >
              SITE: SOROPADAN
            </button>
          </div>
        </header>

        {/* Status Panels */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-white/5 border border-white/10 rounded-2xl">
            <p className="text-[10px] opacity-40 uppercase font-black mb-2">Narasi Semar</p>
            <h2 className="text-xl font-bold italic text-blue-400">"{latest.label}"</h2>
          </div>
          <div className="p-6 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl">
            <p className="text-[10px] text-emerald-500 uppercase font-black mb-2">Suhu Lahan (OYOD)</p>
            <p className="text-4xl font-light">{latest.temp}°C</p>
          </div>
          <div className="p-6 bg-blue-500/10 border border-blue-500/20 rounded-2xl">
            <p className="text-[10px] text-blue-400 uppercase font-black mb-2">Suhu Udara (BMKG)</p>
            <p className="text-4xl font-light">{dataBMKG.temp}°C</p>
          </div>
        </div>

        {/* Main Chart */}
        <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-6 h-[400px]">
          <h3 className="text-[10px] font-black opacity-30 uppercase tracking-[0.4em] mb-6">Battle Journal - {activeSite}</h3>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={filteredData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
              <XAxis dataKey="time" stroke="#ffffff20" fontSize={10} />
              <YAxis stroke="#ffffff20" fontSize={10} />
              <Tooltip contentStyle={{backgroundColor: '#0f172a', border: 'none', borderRadius: '10px'}} />
              <Area type="monotone" dataKey="temp" stroke="#ef4444" fill="#ef4444" fillOpacity={0.1} strokeWidth={3} name="Suhu" />
              <Area type="monotone" dataKey="hum" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.1} strokeWidth={3} name="Lembab" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <footer className="text-center opacity-20 text-[9px] uppercase tracking-[0.5em] pt-4">
          © 2026 AGROEDULABS x OYOD - Berakar, Bergerak, Berarti.
        </footer>
      </div>
    </div>
  );
}
