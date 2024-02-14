import './Setting.scss';
import { SubHeader } from '../components/Header';
import NavBar from '../components/NavBar';
import Profile from '../components/Profile';
import Footer from '../components/Footer';
import Toggle from '../components/Toggle';
import { ReactComponent as Arrow } from '../assets/images/arrow-thin.svg';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Setting() {
	const jwtToken = sessionStorage.getItem('accessToken');
	const navigate = useNavigate();
	const [userInfo, setUserInfo] = useState({
		nickname: '',
		gender: '',
		major: '',
		student_id: '',
		user_img: '',
	});

	// 유저 정보 조회
	const userInfoGet = async () => {
		try {
			const res = await axios.get('https://univeus.site/profile/userInfo', {
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

	useEffect(() => {
		userInfoGet();
	}, []);
	return (
		<div className="setting">
			<SubHeader headertext={'설정'} />
			<div className="setting-body">
				<div className="sb-user-profile">
					<Profile gender={userInfo.gender} profileImg={userInfo.user_img} myProfile />
					<div className="sbu-text">
						<div className="sbu-name">{userInfo.nickname}</div>
						<div className="sbu-classof">
							{userInfo.student_id} / {userInfo.major}
						</div>
					</div>
				</div>
				<div className="sb-setting-box">
					<div className="sbs-group">
						<div className="sbs-title">프로필 설정</div>
						<div
							className="sbs-btn"
							onClick={() => {
								navigate('/profile/change');
							}}
						>
							<span className="sbs-btn-text">프로필 변경</span>
							<Arrow />
						</div>
					</div>
					<div className="sbs-group">
						<div className="sbs-title">멤버쉽 관리</div>
						<div
							className="sbs-btn"
							onClick={() => {
								navigate('/profile/change');
							}}
						>
							<span className="sbs-btn-text">결제수단 관리</span>
							<Arrow />
						</div>
					</div>
					<div className="sbs-group">
						<div className="sbs-title">이용약관</div>
						<div
							className="sbs-btn"
							onClick={() => {
								navigate('/profile/change');
							}}
						>
							<span className="sbs-btn-text">서비스 이용약관</span>
							<Arrow />
						</div>
						<div
							className="sbs-btn"
							onClick={() => {
								navigate('/profile/change');
							}}
						>
							<span className="sbs-btn-text">개인정보 이용동의 및 활용 약관</span>
							<Arrow />
						</div>
						<div className="sbs-btn">
							<span className="sbs-btn-text">문자 및 마케팅 수신동의</span>
							{/* 토글로 변경하기 */}
							{/* 문자 및 마케팅 수신동의 데이터 받기 */}
							<Toggle toggle={true} />
						</div>
					</div>
					<div className="sbs-group">
						<div className="sbs-title">CONTACT</div>
						<div
							className="sbs-btn"
							onClick={() => {
								window.location.href = 'https://www.instagram.com/unive.us?igsh=MWo2MDEwMWFza3Vkcg==';
							}}
						>
							<span className="sbs-btn-text">인스타그램</span>
							<Arrow />
						</div>
						<div
							className="sbs-btn"
							onClick={() => {
								window.location.href = '/';
							}}
						>
							<span className="sbs-btn-text">문의하기</span>
							<Arrow />
						</div>
					</div>
					<div className="sbs-hr"></div>
					<div className="sbs-group">
						<div
							className="sbs-btn"
							onClick={() => {
								navigate('/profile/change');
							}}
						>
							<span className="sbs-btn-text">로그아웃</span>
							<Arrow />
						</div>
						<div
							className="sbs-btn"
							onClick={() => {
								navigate('/profile/change');
							}}
							style={{ marginBottom: '80px' }}
						>
							<span className="sbs-btn-text">회원탈퇴</span>
							<Arrow />
						</div>
					</div>
				</div>
				<Footer />
			</div>
			<NavBar />
		</div>
	);
}
