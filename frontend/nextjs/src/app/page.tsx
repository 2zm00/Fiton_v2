'use client'

import React from "react"
import { motion } from "framer-motion";
import Location from "@/app/location/page";
import Search from "@/app/search/page";
import Banner from "@/components/common/Banner";
import { RecommendInstructor, RecommendLesson } from "./(recommend)/page";

export default function Home() {
    return (
      <div className="container mx-auto px-4 py-8">
        <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl font-bold"
      >
        Fiton에 오신 것을 환영합니다!
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="text-lg text-gray-600 mt-4 mb-8"
      >
        당신의 활력을 위한 최고의 선택
      </motion.p>
      
      {/* 배너 */}
      <Banner />

      {/* 추천 메뉴: 추천 강사 */}
      <RecommendInstructor />

      {/* 추천 메뉴: 추천 수업 */}
      <RecommendLesson />

      {/* 검색창 */}
      <Search />

      {/* 위치 정보 */}
      <Location />
      
    </div>
  );
};