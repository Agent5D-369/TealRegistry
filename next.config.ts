import type { NextConfig } from "next";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  poweredByHeader: false,
  output: "standalone",
  turbopack: {
    root: projectRoot,
  },
  // Keep Prisma out of the Next.js/Turbopack bundle — load at runtime via Node require
  serverExternalPackages: ["@prisma/client", ".prisma/client"],
  typescript: {
    // Type errors are caught in local dev and CI — not during Railway builds
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
