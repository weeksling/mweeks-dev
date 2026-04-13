/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'ts', 'tsx'],
  transpilePackages: ['@keystatic/core', '@keystatic/next'],
}
module.exports = nextConfig