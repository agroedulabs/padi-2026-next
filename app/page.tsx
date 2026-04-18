"use client";
import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, ReferenceLine } from 'recharts';

export default function PadiStorytelling() {
  // Data dummy untuk simulasi Timeseries Sebelum & Sesudah Penyiraman
  const [dataSeries] = useState([
    { time: '10:00', temp: 33, hum: 25, status: 'Serangan Banas Pati' },
    { time: '10:05', temp: 35, hum: 20, status: 'Kritis!' },
    { time: '10:10', temp: 28, hum: 75, status: 'Siraman Semar' }, // Pompa ON di sini
    { time: '10:15', temp: 27, hum: 70, status: 'Tanah Nyaman' },
    { time: '10:20', temp: 26, hum: 68, status: 'Semar Berjaya' },
  ]);

  return (
    <div className="min-h-screen bg-slate-950 text-white p-4 md:p-8 font-sans relative overflow-hidden">
      {/* Background Sawah Blur */}
      <div className="fixed inset-0 z-0 opacity-30" style={{backgroundImage: `url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=2000&q=80')`, backgroundSize: 'cover', backgroundPosition: 'center', filter: 'blur(10px)'}} />
      
      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header Storytelling */}
        <header className="flex justify-between items-start mb-10">
          <div>
            <h1 className="text-4xl font-black tracking-tighter italic">PADI 2026</h1>
            <p className="text-emerald-400 font-bold uppercase tracking-[0.3em] text-[10px]">Pusat Intelijen Lahan AgroEduLabs</p>
          </div>
          <div className="bg-white/5 backdrop-blur-md border border-white/20 px-4 py-2">
            <span className="font-black tracking-widest text-xl">OYOD</span>
          </div>
        </header>

        {/* Indikator Lampu Lalu Lintas (Quick Catch) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-emerald-500/20 border border-emerald-500/50 p-4 rounded-xl flex items-center gap-4">
            <div className="h-4 w-4 bg-emerald-500 rounded-full animate-pulse" />
            <span className="text-xs font-bold tracking-widest uppercase">Semar Berjaya (Aman)</span>
          </div>
          <div className="bg-yellow-500/10 border border-yellow-500/30 p-4 rounded-xl flex items-center gap-4 opacity-50">
            <div className="h-4 w-4 bg-yellow-500 rounded-full" />
            <span className="text-xs font-bold tracking-widest uppercase">Banas Pati Mengintip (Waspada)</span>
          </div>
          <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-xl flex items-center gap-4 opacity-50">
            <div className="h-4 w-4 bg-red-500 rounded-full" />
            <span className="text-xs font-bold tracking-widest uppercase">Kritis! El Niño (Darurat)</span>
          </div>
        </div>

        {/* Grafik "Medan Perang" Semar vs Banas Pati */}
        <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-6 mb-8">
          <h3 className="text-sm font-bold opacity-40 uppercase tracking-[0.2em] mb-6 text-center italic">"Buku Harian Perlawanan Lahan" (24 Jam Terakhir)</h3>
          <div className="h-[300px] w-full">
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
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                <XAxis dataKey="time" stroke="#ffffff40" fontSize={10} />
                <YAxis stroke="#ffffff40" fontSize={10} />
                <Tooltip contentStyle={{backgroundColor: '#0f172a', border: '1px solid #ffffff20', fontSize: '12px'}} />
                {/* Garis Penanda Intervensi (Pompa ON) */}
                <ReferenceLine x="10:10" stroke="#3b82f6" strokeDasharray="3 3" label={{ position: 'top', value: 'Semar Beraksi', fill: '#3b82f6', fontSize: 10 }} />
                
                <Area type="monotone" dataKey="temp" stroke="#ef4444" fillOpacity={1} fill="url(#colorTemp)" name="Api Banas Pati (°C)" />
                <Area type="monotone" dataKey="hum" stroke="#3b82f6" fillOpacity={1} fill="url(#colorHum)" name="Air Semar (%)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Kartu Dampak (Impact Card): Sebelum vs Sesudah */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="bg-red-500/10 border border-red-500/20 p-6 rounded-2xl relative">
             <span className="absolute -top-3 left-6 bg-red-500 text-[10px] font-black px-3 py-1 uppercase italic">Sebelum</span>
             <h4 className="text-xl font-bold mb-2">Tanah Haus 🥵</h4>
             <p className="text-xs text-white/60 mb-4 italic leading-relaxed">"Banas Pati menyerang! Tanah mulai retak, bawang merah terengah-engah dalam hawa panas."</p>
             <div className="flex justify-between border-t border-white/5 pt-4">
                <div><p className="text-[10px] opacity-40 uppercase">Suhu</p><p className="text-2xl font-mono">35.0°C</p></div>
                <div><p className="text-[10px] opacity-40 uppercase">Lembab</p><p className="text-2xl font-mono text-red-400">20%</p></div>
             </div>
          </div>

          <div className="bg-emerald-500/10 border border-emerald-500/20 p-6 rounded-2xl relative">
             <span className="absolute -top-3 left-6 bg-emerald-500 text-[10px] font-black px-3 py-1 uppercase italic">Sesudah</span>
             <h4 className="text-xl font-bold mb-2">Tanah Nyaman 😎</h4>
             <p className="text-xs text-white/60 mb-4 italic leading-relaxed">"Sistem otomatis mengaktifkan Jurus Air. Semar kembali memeluk akar dengan kesejukan."</p>
             <div className="flex justify-between border-t border-white/5 pt-4">
                <div><p className="text-[10px] opacity-40 uppercase">Turun</p><p className="text-2xl font-mono text-emerald-400">-7.8°C</p></div>
                <div><p className="text-[10px] opacity-40 uppercase">Pulih</p><p className="text-2xl font-mono text-emerald-400">75%</p></div>
             </div>
          </div>
        </div>

        {/* Tombol Manual Override (The Hero Action) */}
        <div className="flex flex-col items-center">
          <button className="group relative px-12 py-4 bg-emerald-600 hover:bg-emerald-500 transition-all rounded-full font-black uppercase tracking-[0.2em] shadow-[0_0_30px_rgba(16,185,129,0.3)]">
            🌊 Panggil Elemen Air Sekarang!
          </button>
          <p className="mt-4 text-[10px] opacity-30 uppercase tracking-widest italic">PADI 2026 Operasional Site: Kendal - Soropadan</p>
        </div>

      </div>
    </div>
  );
}
