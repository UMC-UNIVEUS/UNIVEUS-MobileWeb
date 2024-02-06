import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function Loading() {
	const navigate = useNavigate();
	const [accessCode, setAccessCode] = useState('');

	console.log('accessCode1', accessCode);

	// const loginAxios = async () => {
	// 	try {
	// 		const res = await axios.post('/user/login', { code: accessCode });
	// 		console.log(res);
	// 	} catch (error) {
	// 		console.log(error);
	// 	}
	// };

	const loginAxios = async () => {
		try {
			const res = await axios.post('/user/login', { code: accessCode });
			console.log(res);
		} catch (error) {
			if (error.response && error.response.status === 200 && error.response.data) {
				// 만약 서버가 HTML 응답을 반환하면 이를 처리
				console.log('서버에서 HTML 응답을 받았습니다.');
				// 적절한 에러 처리 로직을 구현
			} else {
				// 일반적인 네트워크 에러 처리
				console.log('네트워크 에러:', error.message);
			}
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
