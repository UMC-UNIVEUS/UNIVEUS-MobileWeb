import './MyFeed.scss';
import Button from '../components/Button';
import MeetingCard from '../components/MeetingCard';
import { MainHeader } from '../components/Header';
import NavBar from '../components/NavBar';

export default function MyFeed() {
	return (
		<div className="my-feed">
			<MainHeader />
			<div className="mf-body">
				<div className="mf-page">
					<div className="page-tap">
						<span style={{ color: 'var(--light-gray-color)' }}>1. 상세 정보 입력</span>
						<div className="page-hr" style={{ backgroundColor: 'var(--light-gray-color)' }}></div>
					</div>
					<div className="page-tap">
						<span>2. 소개글 글쓰기</span>
						<div className="page-hr"></div>
					</div>
				</div>
			</div>
			<NavBar />
		</div>
	);
}
