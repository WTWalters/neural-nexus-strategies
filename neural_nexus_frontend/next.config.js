/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  images: {
    domains: ["res.cloudinary.com"],
    unoptimized: true,
  },
  redirects: async () => {
    return [
      {
        source: "/services/accelerator/quiz",
        destination: "/services/accelerator/assessment",
        permanent: false,
      },
    ];
  },
  rewrites: async () => {
    const apiUrl =
      process.env.NEXT_PUBLIC_API_URL ||
      "https://nns-backend-production.up.railway.app";
    return [
      {
        source: "/api/:path*",
        destination: `${apiUrl}/api/:path*`,
      },
    ];
  },
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
};

module.exports = nextConfig;
