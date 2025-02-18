import React from 'react';
import type { Metadata } from "next";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import "./globals.css";
import { Noto_Sans_KR, Poppins } from 'next/font/google';

const notosans = Noto_Sans_KR({
  weight: ['400', '700'], // Regular, Bold
  subsets: ['latin'], // 필요한 언어 서브셋
  variable: '--font-noto-sans-kr', // CSS 변수로 정의
});

const poppins = Poppins({
  weight: ['800'], // ExtraBold
  style: ['italic'], // Italic
  subsets: ['latin'], // 필요한 언어 서브셋
  variable: '--font-poppins', // CSS 변수로 정의
});

export const metadata: Metadata = {
  title: '핏-온!',
  description: '핏온은 활력을 좋아하는 사람들을 위해 만들어졌습니다.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${notosans.variable}`}>
      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
