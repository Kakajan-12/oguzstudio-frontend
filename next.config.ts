import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const apiUrl = new URL(process.env.API_URL ?? "http://localhost:4000");
const isLocalApi = ["localhost", "127.0.0.1", "[::1]"].includes(apiUrl.hostname);

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    agentFeedback: true,
  },
  cacheComponents: true,
  partialPrefetching: true,
  images: {
    remotePatterns: [new URL(`${apiUrl.origin}/uploads/**`)],
    dangerouslyAllowLocalIP: isLocalApi,
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
