/** @type {import('next').NextConfig} */
const nextConfig = {}
export default {
    eslint: {
      rules: {
        ignoreDuringBuilds: true,
        suppressHydrationWarning: true,
        
      },
    },
  }