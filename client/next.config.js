/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['images.clerk.dev', 'img.clerk.com'],
  },
  transpilePackages: ['shared'],
}

module.exports = nextConfig