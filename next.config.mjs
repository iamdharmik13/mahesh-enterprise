/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "firebasestorage.googleapis.com" },
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
  // Allow building even with TypeScript warnings during dev
  typescript: { ignoreBuildErrors: false },
  eslint: { ignoreDuringBuilds: false },
};
export default nextConfig;
