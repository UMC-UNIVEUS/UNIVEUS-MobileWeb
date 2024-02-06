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
	const [createInfo, setCreateInfo] = useState({
		userInfo: {},
		createInfo: [],
	});
	const [participantInfo, setParticipantInfo] = useState([]);
	const [clicked, setClicked] = useState('create'); // create, participant
	const navigate = useNavigate();

	// 진형 토큰
	const jwtToken =
		'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsImlhdCI6MTcwNTMzMTU2MiwiZXhwIjoxNzEzOTcxNTYyLCJpc3MiOiJ1bml2ZXVzIn0.Heqp8oHlO5I5c-1l1NMod3zZT2HN5IzPmuJWixbgN3E';

	// 채연 토큰
	// const jwtToken =
	// 	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEwLCJpYXQiOjE3MDU0NzE2MjMsImV4cCI6MTcxNDExMTYyMywiaXNzIjoidW5pdmV1cyJ9.FZ5uso5nr375V9N9IIT14KiKAW5GjPLZxWiFYsSdoAQ';

	// 유저 정보 조회
	const userInfoGet = async () => {
		try {
			const res = await axios.get('/profile/userInfo', {
				headers: {
					'x-access-token': jwtToken,
				},
			});
			// console.log(res);
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
			setCreateInfo(res.data.result);
		} catch (error) {
			console.log(error);
		}
	};

	// 참여 정보 조회
	const participantInfoGet = async () => {
		try {
			const res = await axios.get('/profile/participantInfo', {
				headers: {
					'x-access-token': jwtToken,
				},
			});
			console.log(res);
			setParticipantInfo(Object.values(res.data.result.participantInfo));
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		userInfoGet();
		createInfoGet();
		participantInfoGet();
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
					<div
						className={clicked === 'create' ? 'page-tap clicked' : 'page-tap'}
						onClick={() => {
							setClicked('create');
						}}
					>
						<span>생성 유니버스({createInfo.createInfo.length})</span>
						<div className="page-hr"></div>
					</div>
					<div
						className={clicked === 'participant' ? 'page-tap clicked' : 'page-tap'}
						onClick={() => {
							setClicked('participant');
						}}
					>
						<span>참여 유니버스({participantInfo.length})</span>
						<div className="page-hr"></div>
					</div>
				</div>
				{/* <div className="mp-card-list">{cardList.length && cardList.map((meeting) => <Card />)}</div> */}
				<div className="mp-card-list">
					{clicked === 'create'
						? createInfo.createInfo.map((data) => {
								return (
									<Card
										gender={createInfo.userInfo.gender}
										membership={createInfo.userInfo.membership}
										user_img={createInfo.userInfo.user_img}
										{...data}
									/>
								);
						  })
						: participantInfo.map((data) => {
								return <Card {...data} />;
						  })}
				</div>
			</div>
			<NavBar present={'mypage'} />
		</div>
	);
}
