import React from 'react';
import type { Metadata } from "next";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import "./globals.css";




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
    <html lang="ko">
      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
