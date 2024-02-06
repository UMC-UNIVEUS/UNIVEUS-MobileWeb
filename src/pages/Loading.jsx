import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function Loading() {
	const navigate = useNavigate();
	const [accessCode, setAccessCode] = useState('');

	console.log('accessCode1', accessCode);

	useEffect(() => {
		const parsedHash = new URLSearchParams(window.location.search);
		const code = parsedHash.get('code');
		setAccessCode(code);
		// console.log('code', code);
		console.log('accessCode2', accessCode);

		if (accessCode !== null && accessCode !== '') {
			axios({
				method: 'post',
				url: '/user/login',
				data: {
					code: accessCode,
				},
			})
				.then((res) => {
					console.log(res);
					// console.log('data', response.data);
					// console.log('data.code', response.data.code);
				})
				.catch((error) => {
					console.error('axios error:', error);
				});
		}
	}, [accessCode]);
	return <h1>Redirect Page</h1>;
}
