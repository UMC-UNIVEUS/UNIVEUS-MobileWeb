import '../pages/LandingPage.scss';
import { SubHeader } from '../components/Header';
import { ReactComponent as GoogleIcon } from '../assets/images/google.svg';
import backgroundlogo from '../assets/images/landingpage_logo.svg';

import axios from 'axios';

import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const LandingPage = () => {
	const navigate = useNavigate();

	const [accessToken, setAccessToken] = useState('');

	// 소셜로그인 코드

	useEffect(() => {
		const parsedHash = new URLSearchParams(window.location.hash.substring(1));
		const access_Token = parsedHash.get('access_token');
		setAccessToken(access_Token);

		if (accessToken !== null && accessToken !== "") {
			axios({
				method: 'post',
				url: 'https://univeus.site/user/login',
				data: {
					accessToken: accessToken,
				},
			}).then((response) => {
				console.log(response);
				if (response.data.code === 1000) {
					sessionStorage.setItem('accessToken', response.data.result.accessToken);
					navigate('/home');
				} else if (response.data.code === 2019 || response.data.code === 2020) {
					sessionStorage.setItem('accessToken', response.data.result.accessToken);
					navigate('/verification');
				}
			}).catch((error) => {
                console.error('axios error:', error);
            });
		}
	}, [accessToken]);

	const googleSocialLogin = () => {
		window.location.href =
			'https://accounts.google.com/o/oauth2/auth?' +
			'client_id=504260283020-p48do7rb07ciu16pfek4c768mmug0khi.apps.googleusercontent.com&' +
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
				<div className="loginbutton" onClick={googleSocialLogin}>
					<GoogleIcon className="googleicon" />
					<p>구글 소셜로그인</p>
				</div>
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
