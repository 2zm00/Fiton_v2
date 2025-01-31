'use client';

import React, { useState } from "react"
import Link from 'next/link';
import Image from 'next/image';
import { signOut, useSession } from "next-auth/react";


export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: session } = useSession();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };


    return (
		<nav className="bg-opacity-90 backdrop-blur-lg shadow-sm fixed top-0 w-full z-50">
            <div className="container mx-auto px-4 py-1 flex justify-between items-center">
			{/* Fiton 로고 */}
			<Link href="/">
			<Image
				src="/images/fontlogo.png" 
				alt="Fiton Logo" 
				width={120} 
				height={20}
				className="cursor-pointer" 
			/>
			</Link>

			<button
            className="block lg:hidden text-gray-700 focus:outline-none"
            onClick={toggleMenu}
            >
				메뉴
			</button>



			<ul className="hidden lg:flex space-x-12">
				<li><Link href="/instructor" className="hover:text-gray-600">강사</Link></li>
				<li><Link href="/center" className="hover:text-gray-600">센터찾기</Link></li>
				<li><Link href="/lesson" className="hover:text-gray-600">수업</Link></li>
				<li><Link href="/location" className="hover:text-gray-600">지도</Link></li>
				{session ? (
            <>
              {/* 로그인된 경우 */}
				<li className="text-gray-700 font-medium">안녕하세요, {session.username || "사용자"}님!</li>
				<li>
				<button onClick={() => signOut()} className="text-red-500 hover:text-red-600">
					로그아웃
				</button>
				</li>
			</>
			) : (
			<>
				{/* 로그아웃된 경우 */}
				<li>
				<Link href="/login" className="hover:text-gray-600">
					로그인
				</Link>
				</li>
				<li>
				<Link href="/register" className="hover:text-gray-600">
					회원가입
				</Link>
				</li>
            </>
				)}
			</ul>
		</div>

		{isMenuOpen && (
            <div className="absolute top-full left-0 w-full bg-ghostwhite bg-opacity-90 backdrop-blur-md shadow-sm lg:hidden">
            <ul className="flex flex-col space-y-2 p-4 font-noto">
                <li>
                <Link href="/instructor" onClick={toggleMenu} className="hover:text-gray-600">
                    강사
                </Link>
				</li>
				<li>
                <Link href="/center" onClick={toggleMenu} className="hover:text-gray-600">
                센터찾기
                </Link>
				</li>
				<li>
                <Link href="/lesson" onClick={toggleMenu} className="hover:text-gray-600">
                    수업
                </Link>
				</li>
				<li>
                <Link href="/location" onClick={toggleMenu} className="hover:text-gray-600">
                    지도
                </Link>
				</li>
				{session ? (
            <>
              {/* 로그인된 경우 */}
              <li className="text-gray-700 font-medium">안녕하세요, {session.username || "사용자"}님!</li>
              <li>
                <button onClick={() => signOut()} className="text-red-500 hover:underline">
                  로그아웃
                </button>
              </li>
            </>
          ) : (
            <>
              {/* 로그아웃된 경우 */}
              <li>
                <Link href="/login" className="hover:text-gray-600">
                  로그인
                </Link>
              </li>
              <li>
                <Link href="/register" className="hover:text-gray-600">
                  회원가입
                </Link>
              </li>
            </>
			)}
			</ul>
            </div>
        )}
    </nav>
	);
};