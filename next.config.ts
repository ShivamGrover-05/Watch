import type { NextConfig } from "next";

const isGitHubActions = process.env.GITHUB_ACTIONS === "true";

// Base path is ONLY set for GitHub Actions (GitHub Pages project site: /Watch)
// On Vercel and local development, basePath is empty ("") so the site lives at root /
const basePath =
  process.env.NEXT_PUBLIC_BASE_PATH !== undefined
    ? process.env.NEXT_PUBLIC_BASE_PATH
    : isGitHubActions
    ? "/Watch"
    : "";

const nextConfig: NextConfig = {
  // Static export is required when building for GitHub Pages.
  // Vercel natively deploys Next.js with automatic static optimization.
  ...(isGitHubActions || basePath
    ? {
        output: "export" as const,
        basePath: basePath,
        assetPrefix: `${basePath}/`,
        trailingSlash: true,
      }
    : {
        async redirects() {
          return [
            {
              source: "/Watch",
              destination: "/",
              permanent: true,
            },
            {
              source: "/Watch/:path*",
              destination: "/:path*",
              permanent: true,
            },
          ];
        },
      }),
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
