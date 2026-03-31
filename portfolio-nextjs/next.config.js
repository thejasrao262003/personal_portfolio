/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable React strict mode for better development warnings
  reactStrictMode: true,

  // Allow images from these domains (for framerusercontent bg image in menu)
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'framerusercontent.com',
      },
    ],
  },

  // Expose non-secret env vars to the browser via NEXT_PUBLIC_ prefix
  // Secret vars (MONGODB_URI, SMTP_*) are server-only and never exposed
  env: {
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
  },
}

module.exports = nextConfig
