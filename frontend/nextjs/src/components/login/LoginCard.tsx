import Link from "next/link";


export default function LoginCard() {
	return (
		<div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
		{/* 로고 */}
		<div className="text-center mb-6">
			<h1 className="text-3xl font-bold font-poppins">Fiton</h1>
			<p className="text-gray-600">로그인하여 시작하세요</p>
		</div>

		{/* 로그인 폼 */}
		<form>
			{/* 이메일 입력 */}
			<div className="mb-4">
			<label htmlFor="email" className="block text-sm font-medium text-gray-700">
				이메일
			</label>
			<input
				type="email"
				id="email"
				placeholder="이메일을 입력하세요"
				className="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
			/>
			</div>

			{/* 비밀번호 입력 */}
			<div className="mb-4">
			<label htmlFor="password" className="block text-sm font-medium text-gray-700">
				비밀번호
			</label>
			<input
				type="password"
				id="password"
				placeholder="비밀번호를 입력하세요"
				className="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
			/>
			</div>

			{/* 비밀번호 찾기 */}
			<div className="text-right mb-4">
			<Link href="/forgot-password" className="text-sm text-blue-500 hover:underline">
				비밀번호를 잊으셨나요?
			</Link>
			</div>

			{/* 로그인 버튼 */}
			<button
			type="submit"
			className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
			>
			로그인
			</button>
		</form>

		{/* 소셜 로그인 */}
		<div className="mt-6">
			<p className="text-center text-gray-600 mb-4">또는 소셜 계정으로 로그인</p>
			<div className="flex space-x-4 justify-center">
			<button className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-300">
				구글 로그인
			</button>
			<button className="bg-blue-700 text-white py-2 px-4 rounded-lg hover:bg-blue-800 transition duration-300">
				페이스북 로그인
			</button>
			</div>
		</div>

		{/* 회원가입 링크 */}
		<p className="mt-6 text-center text-gray-600">
			계정이 없으신가요?{' '}
			<Link href="/register" className="text-blue-500 hover:underline">
			회원가입
			</Link>
		</p>
		</div>
	);
	
}