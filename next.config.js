/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  // This is necessary to handle some walletconnect deps that don't want to load due to server / client split
  webpack: (config) => {
    config.externals.push("pino-pretty", "lokijs", "encoding", "aws-crt");
    return config;
  },
  swcMinify: true,

};

module.exports = nextConfig;
