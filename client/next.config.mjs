/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  images: {
    domains: ["*", "edurekareko-jigar.s3.ap-south-1.amazonaws.com"],
  },
};

export default nextConfig;
