import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  output: "standalone",
  typescript: {
    // Type errors are caught in local dev and CI — not during Railway builds
    ignoreBuildErrors: true,
  },
  eslint: {
    // Same for ESLint — handled separately
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;

