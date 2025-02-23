import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/todos/:path*",
        destination: "http://localhost:3000/todos/:path*",
      },
    ];
  },
};

export default nextConfig;
