import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
  // ⬇️ AGREGA ESTO PARA ARREGLAR EL ERROR DE PRISMA ⬇️
  serverExternalPackages: ["@prisma/client"]
};

export default nextConfig;