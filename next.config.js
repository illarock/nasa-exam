/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
      },
      // {
      //   protocol: "https",
      //   hostname: "apod.nasa.gov",
      // },
      // {
      //   protocol: "http",
      //   hostname: "mars.jpl.nasa.gov",
      // },
      // {
      //   protocol: "https",
      //   hostname: "mars.jpl.nasa.gov",
      // },
    ],
  },
};

module.exports = nextConfig;
