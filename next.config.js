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
};

module.exports = nextConfig;
