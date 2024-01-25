import './MyPage.scss';
import { MainHeader } from '../components/Header';
import NavBar from '../components/NavBar';
import Profile from '../components/Profile';
import Card from '../components/Card';
import Button from '../components/Button';
import { ReactComponent as Setting } from '../assets/images/setting.svg';
import { ReactComponent as Membership } from '../assets/images/membership.svg';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function MyPage() {
	const [cardList, setCardList] = useState([]);
	const [userInfo, setUserInfo] = useState([]);
	const [clicked, setClicked] = useState('create');
	const navigate = useNavigate();

	const handleMyUniv = () => {};
	const handleParticipate = () => {};

	return (
		<div className="my-page">
			<MainHeader />
			<div className="mp-body">
				<div className="mp-user">
					<div className="mpu-top">
						<Profile />
						<div className="mu-text">
							<div className="mu-name">유니버스 관리자</div>
							<div className="mu-classof">19학번 / 소프트웨어경영대학</div>
						</div>
						<Setting
							className="mu-setting-img"
							onClick={() => {
								navigate('/mypage/setting');
							}}
						/>
					</div>
					{/* 멤버쉽 여부에 따라 display 조정 */}
					<div className="mpu-middle">
						<span className="mm-membership">BETA TESTER</span>
						<Membership />
					</div>
					<div className="mpu-bottom">
						<div className="mb-self-into-text">
							{/* 작성 여부에 따라 문구 달라지기 <나의 N문 N답 보러가기> */}
							<span className="mb-si-main">N문 N답으로 관심도를 높혀볼까요?</span>
							{/* <추가 N문이 있는지 보러갈까요?> */}
							<span className="mb-si-sub">유니버스 참여/생성 시 친구들이 볼 수 있어요 :)</span>
						</div>
						{/* 작성 여부에 따라 이동하는 페이지 변경 */}
						<div
							className="mb-self-into-btn"
							onClick={() => {
								navigate('/');
							}}
						>
							CLICK!
						</div>
					</div>
				</div>
				<div className="mp-page">
					<div className={clicked === 'create' ? 'page-tap clicked' : 'page-tap'} onClick={handleMyUniv}>
						<span>생성 유니버스(1)</span>
						<div className="page-hr"></div>
					</div>
					<div className={clicked === 'participate' ? 'page-tap clicked' : 'page-tap'} onClick={handleParticipate}>
						<span>참여 유니버스(0)</span>
						<div className="page-hr"></div>
					</div>
				</div>
				{/* <div className="mp-card-list">{cardList.length && cardList.map((meeting) => <Card />)}</div> */}
				<div className="mp-card-list">
					<Card />
					<Card />
					<Card />
				</div>
			</div>
			<NavBar present={'mypage'} />
		</div>
	);
}
