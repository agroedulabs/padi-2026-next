"use client";
import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Legend } from 'recharts';

// === GANTI DENGAN URL WEB APP APPS SCRIPT ANDA ===
const URL_SHEET = "https://script.google.com/macros/s/AKfycbyuimpq4fT0L8aArXfQ5Hfuot3xd1iyekCLmSBXcXSLIfQXXX3RHV8kqgFQCFIFck0L/exec";

export default function PadiDashboard() {
  const [data, setData] = useState<any[]>([]);
  const [site, setSite] = useState("PADI-PANTI-KND"); // Default ke Kendal/Panti
  const [loading, setLoading] = useState(true);

  // Data BMKG Statis sebagai pembanding (Standar Langit)
  const dataBMKG = [
    { time: '08:00', temp: 29 }, 
    { time: '12:00', temp: 33 }, 
    { time: '16:00', temp: 30 }, 
    { time: '20:00', temp: 27 }
  ];

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch(URL_SHEET);
        const json = await res.json();
        // Memastikan data yang diterima adalah array
        if (Array.isArray(json)) {
          setData(json);
        }
        setLoading(false);
      } catch (e) {
        console.error("Gagal menjemput data Semar:", e);
        setLoading(false);
      }
    };
    getData();
    const interval = setInterval(getData, 30000); // Update tiap 30 detik
    return () => clearInterval(interval);
  }, []);

  // Filter data berdasarkan Site (Kendal/Panti vs Soropadan)
  const filtered = data.filter((d: any) => d.id_alat === site);
  
  // Ambil data terbaru dari filter tersebut
  const current = filtered.length > 0 
    ? filtered[filtered.length - 1] 
    : { temp: 0, hum: 0, label: "Menunggu Laporan...", pump: "OFF" };

  if (loading) return (
    <div className="min-h-screen bg-black flex items-center justify-center text-emerald-500 font-black tracking-[0.5em] animate-pulse italic">
      SINKRONISASI DATA SEMAR...
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Header & Selektor Lokasi */}
        <header className="flex flex-col md:flex-row justify-between items-center gap-4 border-b border-white/10 pb-6">
          <div>
            <h1 className="text-4xl font-black italic tracking-tighter">PADI 2026</h1>
            <p className="text-emerald-500 text-[10px] font-bold uppercase tracking-[0.4em]">Command Center: Kendal - Soropadan</p>
          </div>
          
          <div className="flex bg-white/5 p-1 rounded-full border border-white/10 backdrop-blur-md">
            <button 
              onClick={() => setSite("PADI-PANTI-KND")} 
              className={`px-6 py-2 rounded-full text-[10px] font-black tracking-widest transition-all ${site === 'PADI-PANTI-KND' ? 'bg-emerald-600 text-white' : 'text-white/40 hover:text-white'}`}
            >
              SITE: PANTI (KND)
            </button>
            <button 
              onClick={() => setSite("PADI-SRP-01")} 
              className={`px-6 py-2 rounded-full text-[10px] font-black tracking-widest transition-all ${site === 'PADI-SRP-01' ? 'bg-emerald-600 text-white' : 'text-white/40 hover:text-white'}`}
            >
              SITE: SOROPADAN
            </button>
          </div>
        </header>

        {/* Panel Angka Utama */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-6 bg-white/5 border border-white/10 rounded-3xl">
            <p className="text-[10px] uppercase opacity-40 mb-2 font-bold tracking-widest text-emerald-500 italic">Laporan Semar</p>
            <p className="text-lg font-bold italic leading-tight">"{current.label}"</p>
          </div>
          
          <div className="p-6 bg-white/5 border border-white/10 rounded-3xl text-center">
            <p className="text-[10px] uppercase opacity-40 mb-2 tracking-widest">Suhu Lahan (OYOD)</p>
            <p className="text-6xl font-black tabular-nums">{current.temp}<span className="text-xl opacity-20">°C</span></p>
          </div>

          <div className="p-6 bg-blue-900/10 border border-blue-500/20 rounded-3xl text-center">
            <p className="text-[10px] uppercase text-blue-400 font-bold mb-2 tracking-widest">Prediksi Langit (BMKG)</p>
            <p className="text-6xl font-black tabular-nums">32<span className="text-xl opacity-20">°C</span></p>
          </div>
        </div>

        {/* Grafik Utama & Komparasi */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Grafik Perjalanan Data Lahan */}
          <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-6 h-[350px]">
            <p className="text-[10px] opacity-30 uppercase mb-6 tracking-[0.3em] text-center font-bold italic">Battle Journal: Lahan {site.includes('PANTI') ? 'Panti' : 'Soropadan'}</p>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={filtered}>
                <defs>
                  <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/><stop offset="95%" stopColor="#ef4444" stopOpacity={0}/></linearGradient>
                  <linearGradient id="colorHum" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/><stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/></linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                <XAxis dataKey="time" stroke="#ffffff20" fontSize={10} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{backgroundColor: '#000', border: 'none', borderRadius: '15px'}} />
                <Area type="monotone" dataKey="temp" stroke="#ef4444" strokeWidth={3} fill="url(#colorTemp)" name="Suhu Lahan" />
                <Area type="monotone" dataKey="hum" stroke="#3b82f6" strokeWidth={3} fill="url(#colorHum)" name="Kelembaban" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Grafik Komparasi Lahan vs BMKG */}
          <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-6 h-[350px]">
            <p className="text-[10px] opacity-30 uppercase mb-6 tracking-[0.3em] text-center font-bold italic">Komparasi: Lahan vs Langit (BMKG)</p>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={dataBMKG}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                <XAxis dataKey="time" stroke="#ffffff20" fontSize={10} />
                <YAxis domain={[20, 40]} hide />
                <Tooltip contentStyle={{backgroundColor: '#111', border: 'none'}} />
                <Legend iconType="circle" wrapperStyle={{fontSize: '10px', paddingTop: '20px'}} />
                <Line name="Prediksi BMKG" type="step" dataKey="temp" stroke="#3b82f6" strokeWidth={2} strokeDasharray="5 5" dot={false} />
                <Line name="Suhu Riil Lahan" type="monotone" data={filtered} dataKey="temp" stroke="#ef4444" strokeWidth={4} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Footer Info Pompa */}
        <div className="flex flex-col md:flex-row justify-between items-center py-6 border-t border-white/5 gap-4">
           <div className={`px-10 py-3 rounded-full font-black text-[10px] uppercase tracking-[0.3em] transition-all ${current.pump === 'ON' ? 'bg-blue-600 animate-pulse' : 'bg-white/5 text-white/20'}`}>
             Status Pompa: {current.pump}
           </div>
           <p className="text-[9px] uppercase tracking-[0.5em] opacity-20 text-center md:text-right">
             © 2026 AGROEDULABS x OYOD - Berakar. Bergerak. Berarti.
           </p>
        </div>

      </div>
    </div>
  );
}
