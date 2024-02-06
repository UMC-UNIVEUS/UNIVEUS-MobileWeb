import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function Loading() {
	const navigate = useNavigate();
	const [accessCode, setAccessCode] = useState('');

	console.log('accessCode1', accessCode);

	const loginAxios = async () => {
		try {
			const res = await axios.post('/user/login', { code: accessCode });
			console.log(res);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		const parsedHash = new URLSearchParams(window.location.search);
		const code = parsedHash.get('code');
		setAccessCode(code);
		console.log('accessCode2', accessCode);

		if (accessCode !== null && accessCode !== '') {
			loginAxios();
		}
	}, [accessCode]);
	return <h1>Redirect Page</h1>;
}
