import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'public.blob.vercel-storage.com',
        port: '',
        pathname: '/**', 
      },
      {
        protocol: 'https',
        hostname: 'vercel.com',
        port: '',
        pathname: '/api/screenshot/**', 
      },
    ],
  },
};

export default nextConfig;