/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals.push("skia-canvas");
      config.externals.push("fs");
    }

    return config;
  },
  async redirects() {
    return [
      { source: "/admin", destination: "/", permanent: false },
      { source: "/a", destination: "/", permanent: false },
    ];
  },
  images: {
    domains: ['casente.s3.us-east-2.amazonaws.com', 'casente-public.s3.us-east-2.amazonaws.com', 's3.us-east-2.amazonaws.com'],
  },
};

module.exports = nextConfig;
