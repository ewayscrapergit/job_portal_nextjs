/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains:["job-portal.ideatosteer.com"]
  },
  env: {
    URL: "https://job-portal.ideatosteer.com/"
  },
}

module.exports = nextConfig
