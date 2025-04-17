/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["via.placeholder.com"],
  },
  // Add environment variables that should be available to the client
  env: {
    NEXT_PUBLIC_APP_URL:
      process.env.NEXT_PUBLIC_APP_URL || "http://localhost:5000",
  },
  // Server settings - ensure app runs on port 5000 as required
  serverRuntimeConfig: {
    port: 5000,
  },
};

module.exports = nextConfig;
