/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export for Hostinger
  output: 'export',
  distDir: 'out',

  // Dev server origins
  allowedDevOrigins: ["*.preview.same-app.com"],

  // Production optimizations
  compress: true,
  poweredByHeader: false,

  // Image optimization
  images: {
    unoptimized: true,
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 31536000, // 1 year cache
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Using remotePatterns instead of deprecated domains
    remotePatterns: [
      {
        protocol: "https",
        hostname: "source.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "ext.same-assets.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "ugc.same-assets.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "same-assets.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "m.media-amazon.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "spainaudiovisualhub.digital.gob.es",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
