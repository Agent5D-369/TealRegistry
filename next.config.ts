import type { NextConfig } from "next";
import { dirname } from "path";
import { fileURLToPath } from "url";

const root = dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  poweredByHeader: false,

  // Railway deploys as a standalone Node.js server
  output: "standalone",

  turbopack: {
    root,
  },

  images: {
    // Allow Railway-hosted images and common CDN domains
    remotePatterns: [
      { protocol: "https", hostname: "**.railway.app" },
      { protocol: "https", hostname: "**.tealregistry.com" },
    ],
    // Optimise local badge assets
    localPatterns: [{ pathname: "/assets/**" }],
  },

  experimental: {
    // Server actions are stable in Next.js 16
    serverActions: { bodySizeLimit: "4mb" },
  },
};

export default nextConfig;
