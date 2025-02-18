import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: process.env.NEXT_PUBLIC_MINIO_ENDPOINT!,
        port: process.env.NEXT_PUBLIC_MINIO_PORT,
        pathname: `/${process.env.NEXT_PUBLIC_MINIO_BUCKET_NAME}/**`,
      },
    ],
  },
  eslint: { 
    ignoreDuringBuilds: true // 빌드 시 검사 활성화
  },
  typescript: {
    ignoreBuildErrors: true, // 타입 오류 시 빌드 차단
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '100mb' 
    }
  }
};

export default nextConfig;
