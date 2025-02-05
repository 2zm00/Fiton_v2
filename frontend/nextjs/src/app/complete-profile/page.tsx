// app/additional-info/page.tsx
"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AdditionalInfo() {
  const { data: session } = useSession();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const response = await fetch("/api/user/role", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.accessToken}`
      },
      body: JSON.stringify({ /* 사용자 입력 데이터 */ })
    });

    if (response.ok) router.push("/dashboard");
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* 사용자 입력 필드 구현 */}
      <button type="submit">제출</button>
    </form>
  );
}
