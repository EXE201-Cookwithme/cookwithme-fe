/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.clerk.com",
      },
      {
        protocol: "https",
        hostname: "d2ajadtnet5q12.cloudfront.net",
      },
    ],
  },
};

export default nextConfig;
