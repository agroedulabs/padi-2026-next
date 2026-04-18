"use client";
import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// GANTI DENGAN URL APPS SCRIPT ANDA
const URL_SHEET = "MASUKKAN_URL_WEB_APP_ANDA_DI_SINI";

export default function Page() {
  const [data, setData] = useState<any[]>([]);
  const [site, setSite] = useState("PADI-PANTI-KND");

  useEffect(() => {
    fetch(URL_SHEET).then(res => res.json()).then(d => setData(d)).catch(e => console.log(e));
  }, []);

  const filtered = data.filter((d: any) => d.id_alat === site);
  const current = filtered.length > 0 ? filtered[filtered.length - 1] : { temp: 0, hum: 0, label: "Loading..." };

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-10">
      <div className="max-w-4xl mx-auto border border-white/10 p-6 rounded-3xl bg-white/5 backdrop-blur-md">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-black italic">PADI 2026</h1>
          <div className="flex gap-2">
            <button onClick={() => setSite("PADI-PANTI-KND")} className={`px-4 py-1 rounded-full text-[10px] ${site === 'PADI-PANTI-KND' ? 'bg-emerald-600' : 'bg-white/10'}`}>PANTI</button>
            <button onClick={() => setSite("PADI-SRP-01")} className={`px-4 py-1 rounded-full text-[10px] ${site === 'PADI-SRP-01' ? 'bg-emerald-600' : 'bg-white/10'}`}>SOROPADAN</button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="p-4 border border-white/10 rounded-2xl text-center">
            <p className="text-[10px] opacity-40 uppercase">Suhu Lahan</p>
            <p className="text-3xl font-mono">{current.temp}°C</p>
          </div>
          <div className="p-4 border border-white/10 rounded-2xl text-center">
            <p className="text-[10px] opacity-40 uppercase">Kelembaban</p>
            <p className="text-3xl font-mono">{current.hum}%</p>
          </div>
        </div>

        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={filtered}>
              <XAxis dataKey="time" hide />
              <Tooltip contentStyle={{backgroundColor: '#000', border: 'none'}} />
              <Area type="monotone" dataKey="temp" stroke="#ef4444" fill="#ef4444" fillOpacity={0.1} />
              <Area type="monotone" dataKey="hum" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.1} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <p className="text-center text-[10px] mt-6 opacity-30 italic">"{current.label}"</p>
      </div>
    </div>
  );
}
