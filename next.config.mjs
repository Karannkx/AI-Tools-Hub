
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    unoptimized: true,
    minimumCacheTTL: 3600, // Cache images for 1 hour
  },
  experimental: {
    optimizePackageImports: ['lucide-react'],
    turbo: true, // Enable Turbopack for faster dev builds
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production', // Remove console logs in production
  },
  swcMinify: true, // Use SWC for minification (faster)
};

export default nextConfig;
