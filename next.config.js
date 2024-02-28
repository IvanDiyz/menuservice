/** @type {import('next').NextConfig} */
const path = require('path');
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "storage.googleapis.com",
        pathname: "**",
      },
    ],
  },
  // webpack: (config) => {
  //   config.resolve.alias['@'] = path.join(__dirname, 'src');
  //   return config;
  // },
};

module.exports = nextConfig;
