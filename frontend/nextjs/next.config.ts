import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    dirs: ['app', 'src'], // 검사 대상 디렉토리 지정
    ignoreDuringBuilds: false // 빌드 시 검사 활성화
  },
  typescript: {
    ignoreBuildErrors: false, // 타입 오류 시 빌드 차단
  }
};

export default nextConfig;
