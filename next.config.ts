import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 只在构建时启用静态导出
  ...(process.env.NODE_ENV === "production" && {
    output: "export",
    distDir: "dist",
  }),
  images: {
    unoptimized: true,
  },
  // 修复 Turbopack 警告
  turbopack: {
    root: "/Users/eric/dreame/code/openclaw-skills",
  },
};

export default nextConfig;
