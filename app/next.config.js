/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  distDir: '/tmp/dist',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  poweredByHeader: false,
}

module.exports = nextConfig
