import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["localhost", "127.0.0.1"],
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
