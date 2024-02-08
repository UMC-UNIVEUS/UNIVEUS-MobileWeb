import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Modal from '../components/Modal';
import { MainHeader, SubHeader } from '../components/Header';
import { ReactComponent as Logo } from '../assets/images/logo2.svg';

export default function Loading() {
	const navigate = useNavigate();
	const [accessToken, setAccessToken] = useState('');
	const [openModal, setOpenModal] = useState(false);

	// 토큰을 클라에서 저장하는 것 구현X -> 추후 백엔드에서 토큰 관리 확정시 기능 구현할 것
	// 서버에게 token 전송
	const loginAxios = async () => {
		try {
			const res = await axios.post('https://univeus.site/user/login', { token: accessToken });
			console.log(res);

			const code = res.data.code;
			if (code === 2004) {
				// 경기대 이메일 X
				setOpenModal(true);
			} else if (code === 'USER0011' || code === 'USER0012') {
				// 본인 인증 X
				navigate('/signup/identity');
			} else if (code === 'USER0013') {
				// 약관 동의 X
				navigate('/signup/terms-of-use');
			} else if (code === 'USER0014') {
				// 소속 등록 X
				navigate('/signup/registration-of-affiliation');
			} else if (code === 'USER0015') {
				// 프로필 등록 X
				navigate('/signup/register-profile');
			}
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		const parsedHash = new URLSearchParams(window.location.hash.substring(1));
		const token = parsedHash.get('access_token');
		setAccessToken(token);

		if (accessToken !== null && accessToken !== '') {
			loginAxios();
		}
	}, [accessToken]);
	return (
		<div className="loading">
			<MainHeader rightNonDisplay />
			<Logo style={{ marginTop: '100px', width: '100%' }} />
		</div>
	);
}
