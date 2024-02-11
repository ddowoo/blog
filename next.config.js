const { withContentlayer } = require("next-contentlayer");

/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  //   async rewrites() {
  //     return [
  //       {
  //         source: "/:path*",
  //         destination: `https://api.notion.com/v1/databases/undefined/query/:path*`, //컨플루언스의 API주소
  //       },
  //     ];
  //   },
};

module.exports = withContentlayer(nextConfig);
