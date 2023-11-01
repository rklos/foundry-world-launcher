/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXTAUTH_URL: process.env.HOST || `http://localhost:${process.env.PORT}`
  },
};

module.exports = nextConfig;
