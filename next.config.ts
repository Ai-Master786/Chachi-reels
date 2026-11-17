import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  serverExternalPackages: ["ffmpeg-static"],
  // Ensure Vercel Serverless Functions bundle the ffmpeg-static Linux x64 binary
  // (~77 MB, well within Vercel's 250 MB function limit) for lossless Full HD / 2K / 4K muxing.
  outputFileTracingIncludes: {
    "/api/media/mux": ["./node_modules/ffmpeg-static/**/*"],
    "/api/media/zip": ["./node_modules/ffmpeg-static/**/*"],
    "/api/status": ["./node_modules/ffmpeg-static/**/*"],
  },
  allowedDevOrigins: ["*.e2b.app", "*.vercel.app", "localhost", "127.0.0.1"],
  images: {
    unoptimized: true,
  },
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
