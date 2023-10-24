/** @type {import('next').NextConfig} */
const path = require('path');
const nextConfig = {
  images: {
    domains: ["lh3.googleusercontent.com"],
  },
  // webpack: (config) => {
  //   config.resolve.alias['@'] = path.join(__dirname, 'src');
  //   return config;
  // },
};

module.exports = nextConfig;
