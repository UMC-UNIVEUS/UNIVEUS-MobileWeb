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
	const jwtToken = sessionStorage.getItem('accessToken');
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

	// 유저 정보 조회
	const userInfoGet = async () => {
		try {
			const res = await axios.get('https://univeus.site/profile/userInfo', {
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
			const res = await axios.get('https://univeus.site/profile/createInfo', {
				headers: {
					'x-access-token': jwtToken,
				},
			});
			console.log(res);
			if (res.data.result.createInfo.code === 'PROFILE0006') {
				setCreateInfo({
					userInfo: {},
					createInfo: [],
				});
			} else {
				setCreateInfo(res.data.result);
			}
		} catch (error) {
			console.log(error);
		}
	};

	// 참여 정보 조회
	const participantInfoGet = async () => {
		try {
			const res = await axios.get('https://univeus.site/profile/participantInfo', {
				headers: {
					'x-access-token': jwtToken,
				},
			});
			console.log(res);
			if (res.data.result.participantInfo.code === 'PROFILE0007') {
				setParticipantInfo([]);
			} else {
				setParticipantInfo(Object.values(res.data.result.participantInfo));
			}
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
						<Profile gender={userInfo.gender} profileImg={userInfo.user_img} myProfile />
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
				<div className="mp-card-list">
					{clicked === 'create' ? (
						createInfo.createInfo.length === 0 ? (
							<span className="mp-nothing-card">생성한 유니버스가 없습니다!</span>
						) : (
							createInfo.createInfo.map((data) => {
								return (
									<Card
										gender={createInfo.userInfo.gender}
										membership={createInfo.userInfo.membership}
										user_img={createInfo.userInfo.user_img}
										{...data}
									/>
								);
							})
						)
					) : participantInfo.length === 0 ? (
						<span className="mp-nothing-card">참여한 유니버스가 없습니다!</span>
					) : (
						participantInfo.map((data) => {
							return <Card {...data} />;
						})
					)}
				</div>
			</div>
			<NavBar present={'mypage'} />
		</div>
	);
}
