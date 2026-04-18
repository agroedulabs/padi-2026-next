"use client";
import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { CloudSun, Thermometer, Droplets, ArrowDown, ArrowUp } from 'lucide-react';

const URL_SHEET = 'MASUKKAN_URL_WEB_APP_APPS_SCRIPT_MU_DI_SINI';

export default function PadiDashboard() {
  const [dataSeries, setDataSeries] = useState([]);
  const [loading, setLoading] = useState(true);

  // Data BMKG (Statik/Prediksi sebagai pembanding)
  const dataBMKG = { temp: 32, hum: 60 }; 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(URL_SHEET);
        const data = await res.json();
        setDataSeries(data);
        setLoading(false);
      } catch (err) {
        console.error("Gagal menjemput data:", err);
        setLoading(false);
      }
    };
    fetchData();
    const inv = setInterval(fetchData, 60000);
    return () => clearInterval(inv);
  }, []);

  if (loading || dataSeries.length === 0) {
    return <div className="min-h-screen bg-slate-950 flex items-center justify-center text-emerald-500 italic uppercase tracking-widest animate-pulse">Menghubungkan ke Tabungan Data Semar...</div>;
  }

  const current = dataSeries[dataSeries.length - 1];
  const previous = dataSeries.length > 1 ? dataSeries[dataSeries.length - 2] : current;

  // Logika Komparasi
  const diffTemp = (current.temp - dataBMKG.temp).toFixed(1);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8 selection:bg-emerald-500/30">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header Storytelling */}
        <header className="flex justify-between items-end border-b border-white/10 pb-6">
          <div className="space-y-1">
            <h1 className="text-5xl font-black italic tracking-tighter">PADI 2026</h1>
            <p className="text-[10px] uppercase tracking-[0.4em] font-bold text-emerald-400">Battle Journal: Semar vs Banas Pati</p>
          </div>
          <div className="text-right">
             <p className="text-[10px] opacity-40 uppercase font-bold">Status Narasi</p>
             <p className="text-lg font-bold text-blue-400">"{current.label || 'Semar Berjaga'}"</p>
          </div>
        </header>

        {/* Panel Komparasi: Lahan vs BMKG */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Sisi Lahan (OYOD) */}
          <div className="bg-emerald-500/5 border border-emerald-500/20 p-6 rounded-3xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10"><Thermometer size={80} /></div>
            <p className="text-[10px] font-black uppercase tracking-widest text-emerald-500 mb-4">Kondisi Akar (Data Sensor)</p>
            <div className="flex items-baseline gap-4">
              <span className="text-7xl font-light tracking-tighter">{current.temp}°C</span>
              <div className="flex items-center text-xs text-red-400 font-bold uppercase">
                {current.temp > previous.temp ? <ArrowUp size={14}/> : <ArrowDown size={14}/>}
                {Math.abs(current.temp - previous.temp).toFixed(1)}° Sejak Terakhir
              </div>
            </div>
            <p className="mt-4 text-xs italic text-white/40">"Semar merasakan panas yang nyata di bawah tanah."</p>
          </div>

          {/* Sisi BMKG (Prediksi Langit) */}
          <div className="bg-blue-500/5 border border-blue-500/20 p-6 rounded-3xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10"><CloudSun size={80} /></div>
            <p className="text-[10px] font-black uppercase tracking-widest text-blue-400 mb-4">Prediksi Langit (BMKG)</p>
            <div className="flex items-baseline gap-4">
              <span className="text-7xl font-light tracking-tighter">{dataBMKG.temp}°C</span>
              <div className="text-[10px] font-bold px-3 py-1 bg-blue-500/20 rounded-full">
                SELISIH: {diffTemp}°C DENGAN LAHAN
              </div>
            </div>
            <p className="mt-4 text-xs italic text-white/40">"BMKG memantau dari atas, OYOD menjaga dari bawah."</p>
          </div>
        </div>

        {/* Grafik Perlawanan Semar */}
        <div className="bg-white/[0.02] border border-white/10 rounded-[2rem] p-8 backdrop-blur-md">
          <div className="flex justify-between items-center mb-10">
            <h3 className="text-[10px] font-black uppercase tracking-[0.4em] opacity-30">Timeseries: Pergerakan Elemen</h3>
            <div className="flex gap-4 text-[10px] font-bold uppercase">
               <span className="flex items-center gap-2 text-red-500"><div className="w-2 h-2 bg-red-500 rounded-full" /> Banas Pati</span>
               <span className="flex items-center gap-2 text-blue-500"><div className="w-2 h-2 bg-blue-500 rounded-full" /> Semar</span>
            </div>
          </div>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={dataSeries}>
                <defs>
                  <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/><stop offset="95%" stopColor="#ef4444" stopOpacity={0}/></linearGradient>
                  <linearGradient id="colorHum" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/><stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/></linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                <XAxis dataKey="time" stroke="#ffffff20" fontSize={10} axisLine={false} tickLine={false} />
                <YAxis stroke="#ffffff20" fontSize={10} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{backgroundColor: '#0f172a', border: 'none', borderRadius: '15px'}} />
                <Area type="monotone" dataKey="temp" stroke="#ef4444" strokeWidth={3} fillOpacity={1} fill="url(#colorTemp)" />
                <Area type="monotone" dataKey="hum" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorHum)" />
                {/* Garis Penanda Saat Semar Beraksi (Pompa ON) */}
                {dataSeries.map((entry, index) => entry.pump === "ON" && (
                  <ReferenceLine key={index} x={entry.time} stroke="#3b82f6" strokeDasharray="3 3" />
                ))}
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Footer info */}
        <footer className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between opacity-30 text-[9px] uppercase tracking-[0.5em] gap-4">
          <p>Kendal - Soropadan Site Operasional</p>
          <p>AgroEduLabs x OYOD © 2026</p>
        </footer>
      </div>
    </div>
  );
}
