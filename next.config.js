/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    // 1. api/short-link 로 이동
    // 2. API 내부에서 redirect 시키기
    return [
      {
        source: '/card/:cardId*',
        destination: '/api/short-link/:cardId*?shortLink=cardId',
      },
    ];
  },
};

export default nextConfig;
