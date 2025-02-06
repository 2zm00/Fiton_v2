'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

interface RoleCheckModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function RoleCheckModal({ isOpen, onClose }: RoleCheckModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">알림</h2>
        <p>아직 추가정보를 입력하지 않으셨어요!</p>
        <p>추가정보를 입력하러 갈까요?</p>
        <div className="flex justify-center gap-4 mt-4">
          <Link 
            href="/user/info/add"
            className="px-4 py-2 bg-sky-400 text-white rounded hover:bg-sky-500"
          >
            추가정보 입력하기
          </Link>
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
          >
            나중에 하기
          </button>
        </div>
      </div>
    </div>
  )
}
