/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    domains: ['images.unsplash.com'],
    unoptimized: true,
  },
  // basePath: '/Visual-learning', // Commented out for Vercel deployment
}

module.exports = nextConfig



