/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
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
