import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["res.cloudinary.com"], // thêm Cloudinary vào đây
  },
  reactStrictMode: true,
};

export default nextConfig;
