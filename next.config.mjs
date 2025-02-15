/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "cdn.sanity.io",
        protocol: "https",
      },
    ],
    domains: ["via.placeholder.com"], // Moved outside `remotePatterns`
  },
};

export default nextConfig;
