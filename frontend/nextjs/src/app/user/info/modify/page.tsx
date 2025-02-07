// app/user/info/modify/page.tsx
'use client';

const ModifyUserInfoPage = () => {
  const handleModify = async (updateData: any) => {
    try {
      const response = await fetch(`${process.env.NEXTAUTH_URL}/api/user/info`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData)
      });
      
      if (!response.ok) throw new Error('Failed to modify user info');
      // Handle success
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>modiofidifdif{ response }</div>
  );
};

export default ModifyUserInfoPage;
