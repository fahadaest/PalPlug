/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    dirs: ['src', 'pages', 'components', 'app'],  
    ignoreDuringBuilds: true,
  },
  images: {
        domains: ['lh3.googleusercontent.com'],
      },
};

export default nextConfig;
