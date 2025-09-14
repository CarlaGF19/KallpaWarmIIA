/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    allowedDevOrigins: [
      "http://localhost:9002",
      "https://6000-firebase-studio-1755809849536.cluster-ocv3ypmyqfbqysslgd7zlhmxek.cloudworkstations.dev"
    ]
  }
};
module.exports = nextConfig;
