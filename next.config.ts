import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },

      // Supabase Storage
      {
        protocol: "https",
        hostname: "wwuvgzalzbksjunyhmwd.supabase.co",
      },
    ],
  },
};

export default nextConfig;