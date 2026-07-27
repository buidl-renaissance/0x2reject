import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  // Travel/profile media are CDN static assets — do not pack them into serverless functions
  outputFileTracingExcludes: {
    "/api/**/*": [
      "./public/travel/**/*",
      "./public/kitty/**/*",
      "./public/profiles/**/*",
      "./public/business-card/**/*",
    ],
  },
  async redirects() {
    return [
      {
        source: "/john/kind-of-man",
        destination: "/john?step=taste",
        permanent: true,
      },
      {
        source: "/john/what-he-does",
        destination: "/john?step=taste",
        permanent: true,
      },
      {
        source: "/john/about",
        destination: "/john?step=taste",
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [{ source: "/john", destination: "/p/john" }];
  },
};

export default nextConfig;
