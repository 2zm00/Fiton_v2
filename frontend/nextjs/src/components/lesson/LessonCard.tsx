'use client';

import React from 'react';
import ImageCard from '../common/ImageCard';

interface ImageCardProps {
	image: string;
	title: string;
	description: string;
	buttonText: string;
}
export default function LessonCard( {
	image, title, description, buttonText 
} : ImageCardProps){
	return (
	<ImageCard
		image={image} 
		title={title} 
		description={description} 
		buttonText={buttonText} 
		onButtonClick={() => console.log('수업 예약 페이지로 이동')}
	/>
	);
}
