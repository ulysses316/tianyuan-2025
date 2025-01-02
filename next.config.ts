import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.terapias-tianyuan.com",
      }
    ]
  }
};

export default nextConfig;
