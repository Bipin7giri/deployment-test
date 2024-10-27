/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  productionBrowserSourceMaps: false, // Disable source maps in production
  optimizeFonts: false, // Disable font optimization
  webpack: (config, { dev }) => {
    if (dev) {
      config.devtool = false; // Disable source maps in development
    }
    return config;
  },
  images: {
    domains: ["peridotnepal.xyz"],
  },
};

export default nextConfig;
