'use client';

import { useRouter, useParams } from 'next/navigation';
import { Role, UserData } from '@/app/types/user';
import { useState, useEffect } from 'react';

export default function ModifyInfoPage() {
  const params = useParams();
  const role = params.role as Role;
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userData, setUserData] = useState({
    username: '',
    name: '',
    profile_image: '',
    role: role,
    gender: '',
    birth: '',
    phone_number: '',
    specialties: [],
    certifications: [],
    years_of_experience: 0,
    bio: '',
    business_registration_number: '',
    rating: 0
  });

  // 기존 데이터 로드
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/user/info');
        const data = await response.json();
        setUserData({
          ...data,
          specialties: data.specialties?.split(', ') || [],
          certifications: data.certifications?.split(', ') || []
        });
      } catch (error) {
        console.error('데이터 로드 오류:', error);
      }
    };
    fetchData();
  }, []);

  // 공통 필드 핸들러
  const handleUserDataChange = (field: keyof UserData, value: any) => {
    setUserData(prev => ({ ...prev, [field]: value }));
  };

  // 강사 필드 핸들러
  const handleInstructorDataChange = (field: keyof UserData, value: string) => {
    if (role !== 'instructor') return;
    
    const processedValue = field === 'specialties' || field === 'certifications' 
      ? value.split(',').map(item => item.trim())
      : field === 'years_of_experience'
        ? parseInt(value) || 0
        : value;

    setUserData(prev => ({ ...prev, [field]: processedValue }));
  };

  // 폼 제출
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const payload = {
        ...userData,
        specialties: userData.specialties.join(", "),
        certifications: userData.certifications.join(", ")
      };

      const response = await fetch('/api/user/info/', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) throw new Error('저장 실패');
      router.push('/user/info');
      
    } catch (error) {
      setError(error instanceof Error ? error.message : '오류 발생');
    } finally {
      setIsLoading(false);
    }
  };

  // 역할별 필드 렌더링
  const renderRoleSpecificFields = () => {
    switch (role) {
      case 'instructor':
        return (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                전문 분야
              </label>
              <input
                type="text"
                value={userData.specialties.join(', ')}
                onChange={(e) => handleInstructorDataChange('specialties', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                경력
              </label>
              <input
                type="number"
                value={userData.years_of_experience}
                onChange={(e) => handleInstructorDataChange('years_of_experience', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              />
            </div>
          </>
        );

      case 'centerowner':
        return (
          <div>
            <label className="block text-sm font-medium text-gray-700">
              사업자 번호
            </label>
            <input
              type="text"
              value={userData.business_registration_number}
              onChange={(e) => handleUserDataChange('business_registration_number', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
          </div>
        );

      default:
        return (
          <div>
            <label className="block text-sm font-medium text-gray-700">
              자기소개
            </label>
            <textarea
              value={userData.bio}
              onChange={(e) => handleUserDataChange('bio', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">프로필 수정</h1>
            <p className="mt-2 text-gray-600">필요한 정보를 입력해주세요</p>
          </div>
  
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-700 font-medium">🚨 {error}</p>
            </div>
          )}
  
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* 기본 정보 섹션 */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900 border-b pb-2">
                기본 정보
              </h2>
  
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* 이름 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    이름 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={userData.name}
                    onChange={(e) => handleUserDataChange('name', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="이름을 입력하세요"
                    required
                  />
                </div>
  
                {/* 성별 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    성별 <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={userData.gender}
                    onChange={(e) => handleUserDataChange('gender', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="Male">남성</option>
                    <option value="Female">여성</option>
                    <option value="None">선택안함</option>
                  </select>
                </div>
  
                {/* 생년월일 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    생년월일 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    value={userData.birth}
                    onChange={(e) => handleUserDataChange('birth', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
  
                {/* 전화번호 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    전화번호 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    value={userData.phone_number}
                    onChange={(e) => handleUserDataChange('phone_number', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="010-1234-5678"
                    pattern="[0-9]{3}-[0-9]{4}-[0-9]{4}"
                    required
                  />
                </div>
  
                {/* 프로필 이미지 */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    프로필 이미지
                  </label>
                  <div className="flex items-center space-x-4">
                    {userData.profile_image && (
                      <img 
                        src={userData.profile_image} 
                        className="w-16 h-16 rounded-full object-cover border"
                        alt="프로필 미리보기"
                      />
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          setUserData({
                            ...userData,
                            profile_image: URL.createObjectURL(file)
                          });
                        }
                      }}
                      className="block w-full text-sm text-gray-500
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-lg file:border-0
                        file:text-sm file:font-semibold
                        file:bg-blue-50 file:text-blue-700
                        hover:file:bg-blue-100"
                    />
                  </div>
                </div>
              </div>
            </div>
  
            {/* 역할별 정보 섹션 */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900 border-b pb-2">
                {role === 'instructor' && '강사 정보'}
                {role === 'centerowner' && '센터 정보'}
                {role === 'member' && '추가 정보'}
              </h2>
              
              <div className="space-y-6">
                {renderRoleSpecificFields()}
              </div>
            </div>
  
            {/* 버튼 그룹 */}
            <div className="flex justify-end space-x-4 mt-10">
              <button
                type="button"
                onClick={() => router.back()}
                className="px-6 py-2.5 text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                disabled={isLoading}
              >
                취소
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                    </svg>
                    저장 중...
                  </span>
                ) : '저장하기'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
