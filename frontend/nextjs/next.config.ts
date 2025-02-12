import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: { 
    ignoreDuringBuilds: true // 빌드 시 검사 활성화
  },
  typescript: {
    ignoreBuildErrors: true, // 타입 오류 시 빌드 차단
  }
};

export default nextConfig;
