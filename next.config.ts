import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export for production
  ...(process.env.NODE_ENV === "production" && {
    output: "export",
    distDir: "dist",
  }),
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
