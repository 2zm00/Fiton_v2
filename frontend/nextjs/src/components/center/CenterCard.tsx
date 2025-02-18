'use client';

import React from 'react';
import ImageCard from '../common/ImageCard';

export default function CenterCard() {
	return (
	<ImageCard
		image="/images/center.jpg"
		title="{title}"
		description="서울특별시 강남구 테헤란로에 위치한 최신 시설의 피트니스 센터입니다."
		buttonText="자세히 보기"
		onButtonClick={() => console.log('센터 상세 페이지로 이동')}
	/>
	);
}



// const centers = await fetch('/api/centers').then((res) => res.json());
// centers.map((center) => (
//   <ImageCard
//     key={center.id}
//     image={center.image}
//     title={center.name}
//     description={center.description}
//     buttonText="자세히 보기"
//     onButtonClick={() => console.log(center.id)}
//   />
// ));
