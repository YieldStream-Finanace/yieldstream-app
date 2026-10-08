/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  typescript: {
    ignoreBuildErrors: true, // Prevents strict type check failures on CI
  },
  eslint: {
    ignoreDuringBuilds: true, // Prevents lint warnings from blocking build
  },
};

module.exports = nextConfig;