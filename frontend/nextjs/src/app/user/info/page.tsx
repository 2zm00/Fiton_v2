'use client';

import { useEffect, useState } from 'react';
import { UserData, InstructorRoleData, MemberRoleData, CenterOwnerRoleData } from '@/app/types/user';

export default function Page() {
  const [data, setData] = useState<{
    user_data: UserData;
    role_data: InstructorRoleData | MemberRoleData | CenterOwnerRoleData;
  } | null>(null);

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
    switch (data.user_data.role) {
      case 'instructor':
        const instructorData = data.role_data as InstructorRoleData;
        return (
          <>
            <p>전문 분야: {instructorData.specialties}</p>
            <p>경력: {instructorData.years_of_experience}년</p>
            <p>자격증: {instructorData.certifications}</p>
            <p>평균 별점: {instructorData.rating}</p>
            <p>자기소개: {instructorData.bio}</p>
          </>
        );
      
      case 'member':
        const memberData = data.role_data as MemberRoleData;
        return <p>자기소개: {memberData.bio}</p>;
      
      case 'centerowner':
        const ownerData = data.role_data as CenterOwnerRoleData;
        return <p>사업자 등록번호: {ownerData.business_registration_number}</p>;
      
      default:
        return null;
    }
  };

  return (
    <div className='bg-white shadow-md rounded-lg mt-8 p-6 max-w-md mx-auto text-center'>
      <h2>기본 정보</h2>
      <div>
        {Object.entries(data.user_data).map(([key, value]) => (
          <p key={key}>
            {key}: {value === null ? 'None' : value}
          </p>
        ))}
      </div>
      <div className='bg-slate-100 shadow-md rounded-lg mt-8 p-6 max-w-md mx-auto'>
        <h2>역할 정보 ({data.user_data.role})</h2>
        <div>{renderRoleData()}</div>
        
      </div>
      
    </div>
  );
}