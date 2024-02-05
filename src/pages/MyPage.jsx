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
import axios from 'axios';

export default function MyPage() {
	const [cardList, setCardList] = useState([]);
	const [userInfo, setUserInfo] = useState({
		nickname: '',
		gender: '',
		major: '',
		student_id: '',
		mebership: '',
		user_img: '',
		making: '',
		participating: '',
		introductionExist: '',
	});
	const [clicked, setClicked] = useState('create');
	const navigate = useNavigate();

	const handleMyUniv = () => {};
	const handleParticipate = () => {};

	// 채연 토큰
	const jwtToken =
		'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEwLCJpYXQiOjE3MDU0NzE2MjMsImV4cCI6MTcxNDExMTYyMywiaXNzIjoidW5pdmV1cyJ9.FZ5uso5nr375V9N9IIT14KiKAW5GjPLZxWiFYsSdoAQ';

	// 유저 정보 조회
	const userInfoGet = async () => {
		try {
			const res = await axios.get('/profile/userInfo', {
				headers: {
					'x-access-token': jwtToken,
				},
			});
			console.log(res);
			setUserInfo(res.data.result.userInfo);
		} catch (error) {
			console.log(error);
		}
	};

	// 생성 정보 조회
	const createInfoGet = async () => {
		try {
			const res = await axios.get('/profile/createInfo', {
				headers: {
					'x-access-token': jwtToken,
				},
			});
			console.log(res);
		} catch (error) {
			console.log(error);
		}
	};

	// 참여 정보 조회
	const participantInfoGet = async () => {
		try {
			const res = await axios.get('/profile/participant', {
				headers: {
					'x-access-token': jwtToken,
				},
			});
			console.log(res);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		userInfoGet();
	}, []);

	return (
		<div className="my-page">
			<MainHeader />
			<div className="mp-body">
				<div className="mp-user">
					<div className="mpu-top">
						<Profile gender={userInfo.gender} profileImg={userInfo.user_img} />
						<div className="mu-text">
							<div className="mu-name">{userInfo.nickname}</div>
							<div className="mu-classof">
								{userInfo.student_id} / {userInfo.major}
							</div>
						</div>
						<Setting
							className="mu-setting-img"
							onClick={() => {
								navigate('/mypage/setting');
							}}
						/>
					</div>
					{/* 멤버쉽 여부에 따라 display 조정 */}
					{userInfo.mebership === 'NO' ? (
						''
					) : (
						<div className="mpu-middle">
							<span className="mm-membership">BETA TESTER</span>
							<Membership />
						</div>
					)}
					{/* 작성 여부에 따라 문구 달라지기 */}
					<div className="mpu-bottom">
						<div className="mb-self-into-text">
							<span className="mb-si-main">
								{userInfo.introductionExist ? '나의 N문 N답 보러가기' : 'N문 N답으로 관심도를 높혀볼까요?'}
							</span>
							<span className="mb-si-sub">
								{userInfo.introductionExist
									? '추가 N문이 있는지 보러갈까요?'
									: '유니버스 참여/생성 시 친구들이 볼 수 있어요 :)'}
							</span>
						</div>
						<div
							className="mb-self-into-btn"
							onClick={() => {
								userInfo.introductionExist
									? navigate('/profile/self-introduction')
									: navigate('/profile/self-introduction-edit');
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
