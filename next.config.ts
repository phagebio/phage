import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  transpilePackages: ["molstar"],
  turbopack: {},
};

export default nextConfig;
