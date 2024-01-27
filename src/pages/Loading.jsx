import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function Loading() {
	const navigate = useNavigate();
	const [accessToken, setAccessToken] = useState('');

	console.log('accessToken1', accessToken);

	useEffect(() => {
		const parsedHash = new URLSearchParams(window.location.hash.substring(1));
		const access_Token = parsedHash.get('access_token');
		setAccessToken(access_Token);
		console.log('accessToken2', accessToken);

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
					console.log('data.code', response.data.code);
					if (response.data.code === 1000) {
						sessionStorage.setItem('accessToken', response.data.result.accessToken);
						console.log('1000');
						navigate('/home');
					} else if (response.data.code === 2004) {
						// 경기대 이메일 x
						console.log('2004');
						navigate('/');
						// openModal5();
					} else if (response.data.code === 'USER0011' || response.data.code === 'USER0012') {
						// 본인인증 x -> 번호인증
						// 번호인증 x -> 번호인증
						sessionStorage.setItem('accessToken', response.data.result.accessToken);
						console.log('번호인증');
						navigate('/signup/identity');
					} else if (response.data.code === 'USER0013') {
						// 약관동의 x -> 약관동의
						sessionStorage.setItem('accessToken', response.data.result.accessToken);
						console.log('약관동의');
						navigate('/signup/terms-of-use');
					} else if (response.data.code === 'USER0014') {
						// 소속인증 x -> 소속인증
						sessionStorage.setItem('accessToken', response.data.result.accessToken);
						console.log('소속인증');
						navigate('/signup/registration-of-affiliation');
					} else if (response.data.code === 'USER0015') {
						// 프로필 등록 x -> 프로필 등록
						sessionStorage.setItem('accessToken', response.data.result.accessToken);
						console.log('프로필 등록');
						navigate('/signup/register-profile');
					}
				})
				.catch((error) => {
					console.error('axios error:', error);
				});
		}
	}, [accessToken]);
	return <h1>Redirect Page</h1>;
}
