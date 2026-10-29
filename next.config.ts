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
    // Content images are uploaded through the admin and served by the API
    remotePatterns: [new URL(`${apiUrl.origin}/uploads/**`)],
    // Only for local development, when the API runs on this machine
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
