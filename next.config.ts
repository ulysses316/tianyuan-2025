import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.terapias-tianyuan.com",
      },
      {
        protocol: "https",
        hostname: "tianyuan.s3.us-east-1.amazonaws.com"
      }
    ]
  }
};

export default nextConfig;
