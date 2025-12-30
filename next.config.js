/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    domains: ['images.unsplash.com'],
    unoptimized: true,
  },
  // Only use basePath for GitHub Pages (which runs in GitHub Actions)
  // Vercel and local dev should be at root
  basePath: process.env.GITHUB_ACTIONS ? '/Visual-learning' : '',
}

module.exports = nextConfig



