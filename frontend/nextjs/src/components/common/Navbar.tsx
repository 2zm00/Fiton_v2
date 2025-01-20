'use client'

import React from "react"

export default function Navbar() {
    return (
		<div className="container mx-auto px-4 py-3 flex justify-between items-center">
			<h1 className="text-xl font-bold">Fiton</h1>
			<ul className="flex space-x-4">
				<li><a href="/" className="hover:text-gray-600">Home</a></li>
				<li><a href="/instructor" className="hover:text-gray-600">강사</a></li>
				<li><a href="/center" className="hover:text-gray-600">센터찾기</a></li>
				<li><a href="/lesson" className="hover:text-gray-600">수업</a></li>
				<li><a href="#map" className="hover:text-gray-600">지도</a></li>
				<li><a href="#user" className="hover:text-gray-600">인증(내정보/로그아웃/알림)</a></li>
				<li><a href="#login" className="hover:text-gray-600">로그인</a></li>
				<li><a href="#register" className="hover:text-gray-600">회원가입</a></li>
			</ul>
		</div>
	);
};