import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function Loading() {
	const navigate = useNavigate();
	const [accessToken, setAccessToken] = useState('');

	console.log('accessCode1', accessToken);

	const loginAxios = async () => {
		try {
			const res = await axios.post('/user/login', { token: accessToken });
			console.log(res);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		const parsedHash = new URLSearchParams(window.location.hash.substring(1));
		const token = parsedHash.get('access_token');
		setAccessToken(token);
		console.log('accessCode2', accessToken);

		if (accessToken !== null && accessToken !== '') {
			loginAxios();
			// 	axios({
			// 		method: 'post',
			// 		url: '/user/login',
			// 		data: {
			// 			code: accessCode,
			// 		},
			// 	})
			// 		.then((res) => {
			// 			console.log(res);
			// 		})
			// 		.catch((err) => {
			// 			console.log(err);
			// 		});
		}
	}, [accessToken]);
	return <h1>Redirect Page</h1>;
}
