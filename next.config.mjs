/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    dirs: ['src', 'pages', 'components', 'app'],  
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
