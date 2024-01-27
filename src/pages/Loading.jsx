import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function Loading() {
	const navigate = useNavigate();
	const [accessToken, setAccessToken] = useState('');

	const parsedHash = new URLSearchParams(window.location.hash.substring(1));
	const access_Token = parsedHash.get('access_token');
	setAccessToken(access_Token);

	useEffect(() => {
		if (accessToken !== null && accessToken !== '') {
			axios({
				method: 'post',
				url: '/user/login',
				data: {
					accessToken: accessToken,
				},
			})
				.then((response) => {
					console.log(response);
					if (response.data.code === 1000) {
						sessionStorage.setItem('accessToken', response.data.result.accessToken);
						navigate('/home');
					} else if (response.data.code === 2004) {
						// 경기대 이메일 x
						navigate('/');
						// openModal5();
					} else if (response.data.code === 'USER0011' || response.data.code === 'USER0012') {
						// 본인인증 x -> 번호인증
						// 번호인증 x -> 번호인증
						sessionStorage.setItem('accessToken', response.data.result.accessToken);
						navigate('/signup/identity');
					} else if (response.data.code === 'USER0013') {
						// 약관동의 x -> 약관동의
						sessionStorage.setItem('accessToken', response.data.result.accessToken);
						navigate('/signup/terms-of-use');
					} else if (response.data.code === 'USER0014') {
						// 소속인증 x -> 소속인증
						sessionStorage.setItem('accessToken', response.data.result.accessToken);
						navigate('/signup/registration-of-affiliation');
					} else if (response.data.code === 'USER0015') {
						// 프로필 등록 x -> 프로필 등록
						sessionStorage.setItem('accessToken', response.data.result.accessToken);
						navigate('/signup/register-profile');
					}
				})
				.catch((error) => {
					console.error('axios error:', error);
				});
		}
	}, []);
	return <h1>Redirect Page</h1>;
}
