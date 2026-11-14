/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false, // <-- This is what stops the double render
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;