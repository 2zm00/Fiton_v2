
export default function CenterHeader() {
	return(
		<div className="container mx-auto px-4 py-8">
			<header className="mb-8 text-center">
		<h1 className="text-4xl font-bold mb-2">센터</h1>
		<p className="text-gray-600">가까운 센터를 찾아보세요!</p>
		</header>


		<div className="mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
		<input
			type="text"
			placeholder="센터 이름 또는 위치 검색"
			className="w-full md:w-1/2 p-2 border border-gray-300 rounded-lg"
		/>
		<select className="w-full md:w-1/4 p-2 border border-gray-300 rounded-lg">
			<option value="">필터 선택</option>
			<option value="location">위치별</option>
			<option value="rating">평점별</option>
		</select>
		</div>
		</div>
	);
}