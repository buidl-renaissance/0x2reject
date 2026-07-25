import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  async rewrites() {
    return [{ source: "/john", destination: "/p/john" }];
  },
};

export default nextConfig;
