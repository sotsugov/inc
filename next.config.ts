import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  rewrites: async () => {
    const baseUrl =
      process.env.NODE_ENV === 'development'
        ? 'http://localhost:8000'
        : `${process.env.BASE_URL}`;

    return [
      {
        source: '/v1/:path*',
        destination: `${baseUrl}/v1/:path*`,
      },
      {
        source: '/docs',
        destination: `${baseUrl}/docs`,
      },
      {
        source: '/openapi.json',
        destination: `${baseUrl}/openapi.json`,
      },
    ];
  },
};

export default nextConfig;
