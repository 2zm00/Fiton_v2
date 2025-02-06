'use client';

import React from 'react';

interface PopupProps {
  message: string; // 팝업에 표시할 메시지
  onConfirm: () => void; // "예" 버튼 클릭 시 호출될 함수
  onCancel: () => void; // "아니오" 또는 "취소" 버튼 클릭 시 호출될 함수
}

export default function Popup({ message, onConfirm, onCancel }: PopupProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      {/* 팝업 컨테이너 */}
      <div className="bg-white p-6 rounded-lg shadow-lg text-center">
        {/* 메시지 */}
        <p className="text-lg font-medium mb-4">{message}</p>
        {/* 버튼 그룹 */}
        <div className="flex justify-center space-x-4">
          <button
            onClick={onConfirm}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            예
          </button>
          <button
            onClick={onCancel}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
          >
            아니오
          </button>
        </div>
      </div>
    </div>
  );
}
