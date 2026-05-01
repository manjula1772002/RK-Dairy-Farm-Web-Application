/** @type {import('next').NextConfig} */
const proxyUrl =
  process.env.NEXT_PUBLIC_PROXY_URL ||
  "http://localhost:5000";

const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${proxyUrl}/:path*`,
      },
    ];
  },
};

export default nextConfig;
