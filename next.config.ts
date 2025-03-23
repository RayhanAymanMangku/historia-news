import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // Mengizinkan semua hostname
        port: '',
        pathname: '**',
      },
    ],
    // domains: ['example.com', 'another-domain.com'], // Jika ingin spesifik
  },
};

export default nextConfig;
