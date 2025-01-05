// Path: next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${process.env.NEXT_PUBLIC_API_URL}/api/:path*`,
      },
    ];
  },
  // Add this section
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Add this to prevent static exports
  experimental: {
    // This will make the build process use server-side rendering
    workerThreads: false,
    cpus: 1,
  },
};

module.exports = nextConfig;
