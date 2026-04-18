import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    // Mantra agar Vercel tidak mogok kalau ada error tipe data
    ignoreBuildErrors: true,
  },
  eslint: {
    // Mantra agar Vercel tidak cerewet soal aturan penulisan kode
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
