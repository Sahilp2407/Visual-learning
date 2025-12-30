/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    domains: ['images.unsplash.com'],
    unoptimized: true,
  },
  // Use the environment variable if set (for GitHub Pages), otherwise default to root (for Vercel)
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
  reactStrictMode: false,
}

module.exports = nextConfig



