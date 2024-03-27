/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
      },
      {
        protocol: 'https',
        hostname: 'twitter-namecard.vercel.app',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/s/:cardId*',
        destination: '/api/short-link/:cardId*',
      },
    ];
  },
};

export default nextConfig;
