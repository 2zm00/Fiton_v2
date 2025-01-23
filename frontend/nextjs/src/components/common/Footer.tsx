import Image from "next/image";
import Link from "next/link";

export default function Footer() {
    return (
		<div className="container mx-auto mb-10 mt-20">
		{/* 구분선 */}
		<hr className="border-t border-gray-300 mb-4" />

		{/* Footer 내용 */}
		<div className="flex justify-between items-center">
			{/* 왼쪽: 로고와 문장 */}
			<div>
			<h1 className="text-2xl font-poppins font-extrabold italic">
				Fiton-
			</h1>
			<p className="text-xs text-gray-500">활력을 키자</p>
			</div>

			{/* 오른쪽: 텍스트와 링크 */}
			<div className="text-end">
			<p className="text-sm">© 2025 Fiton</p>
			<div className="flex justify-end space-x-4 mt-2">
				<Link
				href="https://www.notion.so/leezmo/Fiton-18499c361091806e8b95fa104a2abc07?pvs=4"
				className="text-sm hover:underline"
				>
				개인정보처리방침
				</Link>
				<Link
				href="https://www.notion.so/leezmo/Fiton-18499c36109180948de3e50de0d7ffbb"
				className="text-sm hover:underline"
				>
				이용약관
				</Link>
			</div>
			</div>
		</div>
		</div>
	);
}
