import '../pages/LandingPage.scss';
import { SubHeader } from '../components/Header';
import { ReactComponent as GoogleIcon } from '../assets/images/google.svg';
import backgroundlogo from '../assets/images/landingpage_logo.svg';

import axios from 'axios';

import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Modal from '../components/Modal';
import Button from '../components/Button';

const LandingPage = () => {
	const navigate = useNavigate();

	const [accessToken, setAccessToken] = useState('');
	const [isModalOpen5, setIsModalOpen5] = useState(false);

	const openModal5 = () => setIsModalOpen5(true);
	const closeModal5 = () => setIsModalOpen5(false);

	// 소셜로그인 코드

	useEffect(() => {
		const parsedHash = new URLSearchParams(window.location.hash.substring(1));
		const access_Token = parsedHash.get('access_token');
		setAccessToken(access_Token);

		if (accessToken !== null && accessToken !== '') {
			axios({
				method: 'post',
				url: 'https://univeus.site/user/login',
				data: {
					accessToken: accessToken,
				},
			})
				.then((response) => {
					// console.log(response);
					if (response.data.code === 1000) {
						sessionStorage.setItem('accessToken', response.data.result.accessToken);
						navigate('/home');
					} else if (response.data.code === 2004) {
						navigate('/');
						openModal5();
					} else if (response.data.code === 2019) {
						sessionStorage.setItem('accessToken', response.data.result.accessToken);
						navigate('/verification');
					} else if (response.data.code === 2020) {
						sessionStorage.setItem('accessToken', response.data.result.accessToken);
						navigate('/register');
					}
				})
				.catch((error) => {
					console.error('axios error:', error);
				});
		}
	}, [accessToken]);

	const googleSocialLogin = () => {
		window.location.href =
			'https://accounts.google.com/o/oauth2/auth?' +
			'client_id=528413916638-pnl1ikrothaaj7in3dmeug8f0aa2abqb.apps.googleusercontent.com&' +
			'redirect_uri=https://univeus.com&' +
			'response_type=token&' +
			'scope=https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile';
	};

	return (
		<div className="LandingPage">
			<SubHeader headertext={'회원가입•간편로그인'} />
			<div className="imagecontainer">
				<img src={backgroundlogo} alt="" className="backgroundlogo" />
			</div>
			<div className="landingpagebody">
				<div className="bannercontainer">
					<div className="bannerfirstrow">
						<LandingPageBanner bannertext={'축제 메이트'} textcolor={'--skyblue-color'} />
						<LandingPageBanner bannertext={'프로젝트'} textcolor={'--deep-blue-color'} />
						<LandingPageBanner bannertext={'공모전'} textcolor={'--deep-gray-color'} />
					</div>
					<div className="bannersecondrow">
						<LandingPageBanner bannertext={'대외활동'} textcolor={'--deep-blue-color'} />
						<LandingPageBanner bannertext={'밥MATE'} textcolor={'--deep-gray-color'} />
						<LandingPageBanner bannertext={'술MATE'} textcolor={'--skyblue-color'} />
					</div>
					<div className="bannerthirdrow">
						<LandingPageBanner bannertext={'맛집 탐방'} textcolor={'--deep-gray-color'} />
						<LandingPageBanner bannertext={'팀원구인'} textcolor={'--skyblue-color'} />
						<LandingPageBanner bannertext={'공부 MATE'} textcolor={'--deep-blue-color'} />
					</div>
				</div>
				<div className="titlecontainer">
					<p className="titletext">
						우리 학교 <span style={{ color: 'var(--deep-blue-color)', fontWeight: 'var(--bold)' }}>MATE</span>가 필요할
						때
					</p>
					<p className="univeustext">UNIVE.US</p>
				</div>
				<div className="notice-text">크롬, 사파리, 삼성인터넷으로 접속해주세요! :)</div>
				<div className="login-btn-group">
					<div className="loginbutton" onClick={googleSocialLogin}>
						<GoogleIcon className="googleicon" />
						<p>구글 소셜로그인</p>
					</div>
				</div>
				<Modal isOpen={isModalOpen5} closeModal={closeModal5} title={'경기대학교 메일만 사용가능합니다.'}>
					<div className="wrongemailcontainer">
						<p>유니버스 KGU는 경기대학교 이메일만</p>
						<p style={{ marginTop: '3px' }}> 사용이 가능합니다 :(</p>
						<p style={{ marginTop: '3px' }}>경기대학교 메일로 재시도 해주세요.</p>
					</div>
					<div className="modalbuttoncontainer">
						<Button
							content={'확인'}
							onClick={() => {
								closeModal5();
							}}
						/>
					</div>
				</Modal>
			</div>
		</div>
	);
};

export const LandingPageBanner = ({ bannertext, textcolor }) => {
	return (
		<div className="LandingPageBanner">
			<p className="bannertext" style={{ color: `var(${textcolor})` }}>
				{bannertext}
			</p>
		</div>
	);
};

export default LandingPage;
