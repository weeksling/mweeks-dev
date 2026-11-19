/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  // The Gatsby site served every page at a trailing-slash URL; keep those canonical.
  trailingSlash: true,
  async redirects() {
    return [
      // Gatsby starter's placeholder contact pages: indexed, but never real content.
      { source: '/contact/:path*', destination: '/', permanent: true },
    ]
  },
}
