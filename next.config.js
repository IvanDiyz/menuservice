/** @type {import('next').NextConfig} */
const path = require('path');
const nextConfig = {
  images: {
    domains: ['cdn.logo.com'],
  },
  // webpack: (config) => {
  //   config.resolve.alias['@'] = path.join(__dirname, 'src');
  //   return config;
  // },
};

module.exports = nextConfig;
