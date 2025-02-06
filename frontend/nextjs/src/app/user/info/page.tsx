'use client';

import { useEffect, useState } from 'react';
import { UserData } from '@/app/types/user';

export default function Page() {
  const [data, setData] = useState<UserData | null>(null);



  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/api/user/info');
      const result = await response.json();
      setData(result);
    };
    
    fetchData();
  }, []);

  if (!data) return <div>Loading...</div>;

  const renderRoleData = () => {
    switch (data.role) {
      case 'instructor':
        const instructorData = data
        return (
          <>
            <p>전문 분야: {instructorData.specialties}</p>
            <p>경력: {instructorData.years_of_experience}년</p>
            <p>자격증: {instructorData.certifications}</p>
            <p>자기소개: {instructorData.bio}</p>
          </>
        );
      
      case 'member':
        const memberData = data
        return <p>자기소개: {memberData.bio}</p>;
      
      case 'centerowner':
        const ownerData = data
        return <p>사업자 등록번호: {ownerData.business_registration_number}</p>;
      
      default:
        return null;
    }
  };

  return (
    <div className='bg-white shadow-md rounded-lg mt-8 p-6 max-w-md mx-auto text-center'>
      <h2>기본 정보</h2>
      <div>
        <p>이름: {data.name}</p>
        <p>성별: 
          {data.gender === 'Male'? '(남자)' : data.gender === 'Female'? ' (여)' : '(기타)'}
        </p>
        <p>생년월일: {data.birth}</p>
        <p>전화번호: {data.phone_number}</p>
        <p>프로필 이미지: {data.profile_image? <img src={data.profile_image} alt='Profile' /> : '프로필 이미지 없음'}</p>

      </div>
      <div className='bg-slate-100 shadow-md rounded-lg mt-8 p-6 max-w-md mx-auto'>
        <h2>역할 정보 ({data.role === 'centerowner'? '(센터장)' : data.role ==='instructor' ? '(강사)' : '회원'})</h2>
        <div>{renderRoleData()}</div>
        
      </div>
      
    </div>
  );
}