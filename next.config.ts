import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  async redirects() {
    return [
      {
        source: "/john/kind-of-man",
        destination: "/john/about",
        permanent: true,
      },
      {
        source: "/john/what-he-does",
        destination: "/john/about",
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [{ source: "/john", destination: "/p/john" }];
  },
};

export default nextConfig;
