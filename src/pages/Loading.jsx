import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function Loading() {
	const navigate = useNavigate();
	const [accessToken, setAccessToken] = useState('');

	useEffect(() => {
		const parsedHash = new URLSearchParams(window.location.hash.substring(1));
		const access_Token = parsedHash.get('access_token');
		setAccessToken(access_Token);

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
						navigate('/');
						// openModal5();
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
	return <h1>Redirect Page</h1>;
}
