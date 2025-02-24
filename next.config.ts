import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    // 画像のリモートパターンを追加
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
      {
        protocol: "https",
        hostname: "leaxotooehutjupuwkmu.supabase.co",
      },
    ],
  },
  // 画像アップロードのサイズ拡張（デフォルト１MB）
  experimental: {
    serverActions: {
      bodySizeLimit: "5mb",
    },
  },
};

export default nextConfig;
