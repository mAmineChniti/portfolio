import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "iad.microlink.io",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "microlink-cdn.s3.amazonaws.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
