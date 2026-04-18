"use client";
import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { MapPin, Thermometer, Droplets, CloudSun, Activity } from 'lucide-react';

// === GANTI DENGAN URL WEB APP GOOGLE SHEETS ANDA ===
const URL_SHEET = 'https://script.google.com/macros/s/AKfycbyuimpq4fT0L8aArXfQ5Hfuot3xd1iyekCLmSBXcXSLIfQXXX3RHV8kqgFQCFIFck0L/exec';

export default function PadiCommandCenter() {
  const [allData, setAllData] = useState([]);
  const [activeSite, setActiveSite] = useState('PADI-PANTI-KND');
  const [loading, setLoading] = useState(true);

  // Data BMKG (Simulasi Pembanding)
  const dataBMKG = { temp: 32, hum: 60 };

  const fetchData = async () => {
    try {
      const response = await fetch(URL_SHEET);
      const result = await response.json();
      setAllData(result);
      setLoading(false);
    } catch (error) {
      console.error("Gagal menjemput data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 60000);
    return () => clearInterval(interval);
  }, []);

  // Filter data berdasarkan Site yang aktif
  const filteredData = allData.filter(item => item.id_alat === activeSite);
  const latest = filteredData.length > 0 ? filteredData[filteredData.length - 1] : { temp: 0, hum: 0, label: 'Lahan Tidur', pump: 'OFF' };

  if (loading) return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-emerald-500 font-black tracking-[0.5em] animate-pulse italic">
      SINKRONISASI SEMAR...
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-950 text-white p-4 md:p-10 font-sans">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Navigation Site */}
        <header className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <h1 className="text-6xl font-black italic tracking-tighter">PADI 2026</h1>
            <p className="text-emerald-400 text-[10px] font-bold uppercase tracking-[0.5em]">Command Center: Kendal - Soropadan</p>
          </div>
          
          <div className="flex bg-white/5 p-1 rounded-2xl border border-white/10 backdrop-blur-xl">
            <button 
              onClick={() => setActiveSite('PADI-PANTI-KND')}
              className={`px-6 py-3 rounded-xl text-[10px] font-black tracking-widest transition-all ${activeSite === 'PADI-PANTI-KND' ? 'bg-emerald-500 text-black' : 'hover:bg-white/5'}`}
            >
              SITE: PANTI (KND)
            </button>
            <button 
              onClick={() => setActiveSite('PADI-SRP-01')}
              className={`px-6 py-3 rounded-xl text-[10px] font-black tracking-widest transition-all ${activeSite === 'PADI-SRP-01' ? 'bg-emerald-500 text-black' : 'hover:bg-white/5'}`}
            >
              SITE: SOROPADAN
            </button>
          </div>
        </header>

        {/* Info Utama & Komparasi BMKG */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/5 border border-white/10 p-8 rounded-[2rem] flex flex-col justify-center">
            <p className="text-[10px] opacity-40 uppercase font-black mb-4 flex items-center gap-2"><Activity size={14}/> Narasi Semar</p>
            <h2 className="text-2xl font-bold italic">"{latest.label}"</h2>
          </div>

          <div className="bg-emerald-500/10 border border-emerald-500/20 p-8 rounded-[2rem]">
            <p className="text-[10px] text-emerald-400 uppercase font-black mb-2 flex items-center gap-2"><Thermometer size={14}/> Suhu Lahan (Real)</p>
            <p className="text-5xl font-light">{latest.temp}<span className="text-xl opacity-30">°C</span></p>
            <p className="mt-4 text-[10px] opacity-40 italic">Lahan {latest.temp > dataBMKG.temp ? 'Lebih Panas' : 'Lebih Sejuk'} dari Langit.</p>
          </div>

          <div className="bg-blue-500/10 border border-blue-500/20 p-8 rounded-[2rem]">
            <p className="text-[10px] text-blue-400 uppercase font-black mb-2 flex items-center gap-2"><CloudSun size={14}/> Suhu Udara (BMKG)</p>
            <p className="text-5xl font-light">{dataBMKG.temp}<span className="text-xl opacity-30">°C</span></p>
            <p className="mt-4 text-[10px] opacity-40 italic">Data Prediksi Wilayah Terdekat.</p>
          </div>
        </div>

        {/* Grafik Perlawanan Lahan */}
        <div className="bg-white/[0.02] border border-white/10 rounded-[2.5rem] p-8 backdrop-blur-md">
          <div className="flex justify-between items-center mb-10">
            <h3 className="text-[10px] font-black uppercase tracking-[0.4em] opacity-30">Timeseries Battle Journal</h3>
            <div className={`px-4 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${latest.pump === 'ON' ? 'bg-blue-500 animate-pulse' : 'bg-emerald-500/20 text-emerald-500'}`}>
              Pompa: {latest.pump}
            </div>
          </div>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={filteredData}>
                <defs>
                  <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/><stop offset="95%" stopColor="#ef4444" stopOpacity={0}/></linearGradient>
                  <linearGradient id="colorHum" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/><stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/></linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                <XAxis dataKey="time" stroke="#ffffff20" fontSize={10} axisLine={false} tickLine={false} />
                <YAxis stroke="#ffffff20" fontSize={10} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{backgroundColor: '#0f172a', border: 'none', borderRadius: '15px'}} />
                <Area type="monotone" dataKey="temp" stroke="#ef4444" strokeWidth={3} fill="url(#colorTemp)" name="Suhu Lahan" />
                <Area type="monotone" dataKey="hum" stroke="#3b82f6" strokeWidth={3} fill="url(#colorHum)" name="Lembab Lahan" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <footer className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 opacity-30 text-[9px] uppercase tracking-[0.5em]">
          <div className="flex items-center gap-2"><MapPin size={12}/> {activeSite === 'PADI-PANTI-KND' ? 'Kendal Site' : 'Soropadan Site'}</div>
          <p>© 2026 OYOD AGROEDULABS x PADI 2026</p>
        </footer>
      </div>
    </div>
  );
}
