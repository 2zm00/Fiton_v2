'use client';

import { useRouter } from "next/navigation"; 
import { useEffect, useState } from "react";

interface ChatInput {
	question: string;
}

interface ChatOutput{
	answer: string;
}

export default function ChatBot() {
	const router = useRouter();
	// 챗봇에서 응답데이터 담기

	const [response, setResponse] = useState<ChatInput>({
		question: '',
	});
	const payload = {
		question: response.question,
	}

	// API 챗봇 요청하기

	useEffect(() => {
		const fetchData = async () => {
                const response = await fetch('/api/chat', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(payload),
                });
                const result = await response.json();
				console.log(result);
				setResponse(result);
			};
			fetchData();
		}, []);

	// 챗봇 펼치기
	

}