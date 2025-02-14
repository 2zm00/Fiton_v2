'use client';


import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';



export default function Navbar() {
	const [isLoggedIn, setIsLoggedIn] = useState(false)
	const router = useRouter()

	const [isMenuOpen, setIsMenuOpen] = useState(false);

	useEffect(() => {
		// Check if user is logged in
		const checkLoginStatus = async () => {
		try {
			const response = await fetch("/api/user/role")
			if (response.ok) {
			setIsLoggedIn(true)
			} else {
			setIsLoggedIn(false)
			}
		} catch (error) {
			console.error("Error checking login status:", error)
			setIsLoggedIn(false)
		}
	}
	checkLoginStatus()
	}, [])

	const handleSignOut = async () => {
		try {
		const response = await fetch("/api/logout", {
			method: "POST",
		})
		if (response.ok) {
			setIsLoggedIn(false)
			router.push("/login")
		}
		} catch (error) {
		console.error("Error signing out:", error)
		}
	}

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
				<li><Link href="/analyze" className="hover:text-gray-600">분석</Link></li>
				{isLoggedIn ? (
					<>
					<Link href="/user/info" className="hover:text-gray-600">마이페이지</Link>
					<li>
					<button onClick={handleSignOut} className="text-red-500 hover:text-red-600">
						로그아웃
					</button>
					</li>
					</>
					) : (
						<>
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
                <Link href="/analyze" onClick={toggleMenu} className="hover:text-gray-600">
                    분석
                </Link>
				</li>
				{isLoggedIn ? (
					<>
					<Link href="/user/info" className="hover:text-gray-600">마이페이지</Link>
					<li>
					<button onClick={handleSignOut} className="text-red-500 hover:text-red-600">
						로그아웃
					</button>
					</li>
					</>
					) : (
						<>
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