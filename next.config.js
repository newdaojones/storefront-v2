/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    appDir: true,
  },

  // This is necessary to handle some walletconnect deps that don't want to load due to server / client split
  webpack: (config) => {
    config.externals.push("pino-pretty", "lokijs", "encoding");
    return config;
  },
  swcMinify: true,
};

module.exports = nextConfig;
