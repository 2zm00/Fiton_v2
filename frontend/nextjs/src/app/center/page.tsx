
import CenterCard from "@/components/center/CenterCard";
import CenterHeader from "@/components/center/CenterHeader";
import CenterList from "@/components/center/CenterList";

export default function Center() {
	return (
		<div >
		{/* 헤더 */}
		<CenterHeader/>

		{/* 센터 리스트 카드 */}
		<CenterList />

		</div>
	);
}
