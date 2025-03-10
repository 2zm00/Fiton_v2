'use client'

import React from "react"
import Location from "@/app/location/page";
import Search from "@/app/search/page";
import Banner from "@/components/common/Banner";
import { RecommendInstructor, RecommendLesson } from "./recommend/page";
import ChatBot from "@/components/chatbot/ChatBot";

export default function Home() {
    return (
      <div className="min-h-screen">
      {/* 배너 섹션
      <Banner /> */}
      <div className="container mx-auto px-4 py-8">
        <h1
        
        className="text-4xl font-bold"
      >
        Fiton에 오신 것을 환영합니다!
      </h1>
      <p
        
        className="text-lg text-gray-600 mt-4 "
      >
        당신의 활력을 위한 최고의 선택
      </p>
      </div>

      {/* 배너 섹션 */}
      <Banner />
      <div className="container mx-auto px-4 py-8">
      {/* 추천 메뉴: 추천 강사 */}
      <RecommendInstructor />

      {/* 추천 메뉴: 추천 수업 */}
      <RecommendLesson />

      {/* 검색창 */}
      <Search />

      {/* 위치 정보 */}
      <Location />

      <ChatBot />
      
    </div>
    </div>
  );
};