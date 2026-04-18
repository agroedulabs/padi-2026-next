"use client";
import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Legend } from 'recharts';

const URL_SHEET = "MASUKKAN_URL_WEB_APP_APPS_SCRIPT_BARU_ANDA";

export default function PadiDashboard() {
  const [data, setData] = useState<any[]>([]);
  const [site, setSite] = useState("PADI-PANTI-KND");
  const [loading, setLoading] = useState(true);

  // Data BMKG (Standar Prediksi)
  const dataBMKG = [
    { time: '08:00', temp: 29 }, { time: '12:00', temp: 33 }, { time: '16:00', temp: 30 }, { time: '20:00', temp: 27 }
  ];

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch(URL_SHEET);
        const json = await res.json();
        setData(json);
        setLoading(false);
      } catch (e) { console.log(e); }
    };
    getData();
    const interval = setInterval(getData, 30000);
    return () => clearInterval(interval);
  }, []);

  const filtered = data.filter((d: any) => d.id_alat === site);
  const current = filtered.length > 0 ? filtered[filtered.length - 1] : { temp: 0, hum: 0, label: "Menunggu Data...", pump: "OFF" };

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-6">
        
        <header className="flex justify-between items-center">
          <h1 className="text-4xl font-black italic tracking-tighter">PADI 2026</h1>
          <div className="flex bg-white/10 p-1 rounded-full border border-white/10">
            <button onClick={() => setSite("PADI-PANTI-KND")} className={`px-4 py-1 rounded-full text-[10px] font-bold ${site.includes('PANTI') ? 'bg-emerald-600' : ''}`}>PANTI</button>
            <button onClick={() => setSite("PADI-SRP-01")} className={`px-4 py-1 rounded-full text-[10px] font-bold ${site === 'PADI-SRP-01' ? 'bg-emerald-600' : ''}`}>SOROPADAN</button>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-6 bg-white/5 border border-white/10 rounded-3xl">
            <p className="text-[10px] uppercase opacity-40 mb-2">Status Lahan</p>
            <p className="text-xl font-bold text-emerald-400 italic">"{current.label}"</p>
          </div>
          <div className="p-6 bg-white/5 border border-white/10 rounded-3xl text-center">
            <p className="text-[10px] uppercase opacity-40 mb-2">Suhu Riil Lahan</p>
            <p className="text-5xl font-mono">{current.temp}°C</p>
          </div>
          <div className="p-6 bg-blue-900/20 border border-blue-500/30 rounded-3xl text-center">
            <p className="text-[10px] uppercase text-blue-400 font-bold mb-2">Prediksi BMKG</p>
            <p className="text-5xl font-mono">32°C</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white/5 border border-white/10 rounded-[2rem] p-6 h-[300px]">
            <p className="text-[10px] opacity-30 uppercase mb-4 tracking-widest text-center">Battle Journal (Lahan)</p>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={filtered}>
                <XAxis dataKey="time" stroke="#555" fontSize={10} />
                <Tooltip contentStyle={{backgroundColor: '#000', border: 'none'}} />
                <Area type="monotone" dataKey="temp" stroke="#ef4444" fill="#ef4444" fillOpacity={0.1} />
                <Area type="monotone" dataKey="hum" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.1} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-[2rem] p-6 h-[300px]">
            <p className="text-[10px] opacity-30 uppercase mb-4 tracking-widest text-center">Komparasi Lahan vs BMKG</p>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={dataBMKG}>
                <XAxis dataKey="time" stroke="#555" fontSize={10} />
                <YAxis domain={[20, 40]} hide />
                <Tooltip />
                <Legend />
                <Line name="Suhu BMKG" type="monotone" dataKey="temp" stroke="#3b82f6" strokeDasharray="5 5" />
                <Line name="Suhu Lahan" type="monotone" data={filtered} dataKey="temp" stroke="#ef4444" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="text-center py-4">
           <div className={`inline-block px-8 py-2 rounded-full font-bold text-xs uppercase tracking-widest ${current.pump === 'ON' ? 'bg-blue-600 animate-pulse' : 'bg-white/10 text-white/40'}`}>
             Pompa: {current.pump}
           </div>
        </div>
      </div>
    </div>
  );
}
