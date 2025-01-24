'use client';

import React from 'react';
import ImageCard from '../common/ImageCard';

export default function LessonCard() {
	return (
	<ImageCard
		image="/images/lesson1.jpg"
		title="요가 클래스"
		description="몸과 마음의 균형을 찾는 요가 클래스입니다."
		buttonText="수업 예약하기"
		onButtonClick={() => console.log('수업 예약 페이지로 이동')}
	/>
	);
}
