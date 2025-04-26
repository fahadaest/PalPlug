/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    CALENDLY_API_TOKEN: process.env.CALENDLY_API_TOKEN,
  },
  eslint: {
    dirs: ['src', 'pages', 'components', 'app'],  
    ignoreDuringBuilds: true,
  },
  images: {
        domains: ['lh3.googleusercontent.com'],
      },
};

export default nextConfig;
