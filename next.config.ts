import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  distDir: 'out', // Add this line to specify the export directory
};

export default nextConfig;
