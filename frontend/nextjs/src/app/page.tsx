'use client'

import React from "react"
import { motion } from "framer-motion";

export default function Home() {
    return (
      <motion.div
      initial={{ opacity: 0, x: 0 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
    <div className="container mx-auto px-4 py-3">
      <h1 className="text-2xl font-bold">핏온!!</h1>
      <p className="text-lg">메인페이지입니다.</p>

      <div>
        <div>추천메뉴:추천강사</div>
        <div>추천메뉴:추천수업</div>
      </div>
      <div>
        검색창
      </div>
      <div>
        배너
      </div>
      <div>
        지도
      </div>
    </div>
    </motion.div>
    
  );
};