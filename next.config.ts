import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  output: "standalone",
  // Keep Prisma out of the Next.js/Turbopack bundle — load at runtime via Node require
  serverExternalPackages: ["@prisma/client", ".prisma/client"],
  typescript: {
    // Type errors are caught in local dev and CI — not during Railway builds
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
