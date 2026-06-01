import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  cacheComponents: true,
  turbopack: {
    root: decodeURIComponent(new URL('.', import.meta.url).pathname),
  },
};

export default nextConfig;
