"use client";
import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// GANTI DENGAN URL APPS SCRIPT ANDA
const URL_SHEET = "MASUKKAN_URL_WEB_APP_ANDA_DI_SINI";

export default function PadiDashboard() {
  const [data, setData] = useState<any[]>([]);
  const [site, setSite] = useState("PADI-PANTI-KND");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch(URL_SHEET);
        const json = await res.json();
        setData(json);
        setLoading(false);
      } catch (e) {
        console.error(e);
      }
    };
    getData();
    const interval = setInterval(getData, 60000);
    return () => clearInterval(interval);
  }, []);

  const filtered = data.filter((d: any) => d.id_alat === site);
  const latest = filtered.length > 0 ? filtered[filtered.length - 1] : { temp: 0, hum: 0, label: "Menunggu Agen..." };

  if (loading) return <div className="min-h-screen bg-black flex items-center justify-center text-emerald-500">MENSINKRONKAN SEMAR...</div>;

  return (
    <div className="min-h-screen bg-slate-950 text-white p-4 md:p-10">
      <div className="max-w-5xl mx-auto">
        <header className="flex flex-col md:row justify-between mb-10 gap-4">
          <div>
            <h1 className="text-5xl font-black italic tracking-tighter">PADI 2026</h1>
            <p className="text-emerald-500 text-[10px] font-bold tracking-[0.3em]">KENDAL - SOROPADAN</p>
          </div>
          <div className="flex gap-2 bg-white/5 p-1 rounded-lg">
            <button onClick={() => setSite("PADI-PANTI-KND")} className={`px-4 py-2 rounded-md text-[10px] font-bold ${site === 'PADI-PANTI-KND' ? 'bg-emerald-600' : ''}`}>PANTI</button>
            <button onClick={() => setSite("PADI-SRP-01")} className={`px-4 py-2 rounded-md text-[10px] font-bold ${site === 'PADI-SRP-01' ? 'bg-emerald-600' : ''}`}>SOROPADAN</button>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <div className="p-8 bg-white/5 border border-white/10 rounded-3xl">
            <p className="text-[10px] opacity-40 uppercase mb-2 text-emerald-400 font-bold tracking-widest text-center italic">"{latest.label}"</p>
            <div className="flex justify-around items-center pt-4">
              <div className="text-center">
                <p className="text-[10px] opacity-40 uppercase">Suhu</p>
                <p className="text-4xl font-mono">{latest.temp}°</p>
              </div>
              <div className="text-center">
                <p className="text-[10px] opacity-40 uppercase">Lembab</p>
                <p className="text-4xl font-mono">{latest.hum}%</p>
              </div>
            </div>
          </div>
          <div className="p-8 bg-blue-500/5 border border-blue-500/10 rounded-3xl flex flex-col justify-center text-center">
             <p className="text-[10px] opacity-40 uppercase mb-2">Analisis Langit (BMKG)</p>
             <p className="text-4xl font-mono">32°C</p>
             <p className="text-[10px] mt-2 opacity-30 italic">Prediksi Wilayah Jawa Tengah</p>
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-[2rem] p-6 h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={filtered}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
              <XAxis dataKey="time" stroke="#ffffff20" fontSize={10} />
              <YAxis stroke="#ffffff20" fontSize={10} />
              <Tooltip contentStyle={{backgroundColor: '#0f172a', border: 'none'}} />
              <Area type="monotone" dataKey="temp" stroke="#ef4444" fill="#ef4444" fillOpacity={0.1} strokeWidth={3} />
              <Area type="monotone" dataKey="hum" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.1} strokeWidth={3} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
