import './IdentityVerification.scss';
import { SubHeader } from '../components/Header';
import NavBar from '../components/NavBar';
import Button from '../components/Button';
import CheckBtn from '../assets/images/arrow_circle.svg';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function IdentityVerification() {
	const [accessToken, setAccessToken] = useState('');

	const [phoneNumber, setPhoneNumber] = useState('');
	const [verifyNumber, setVerifyNumber] = useState('');

	const handlePhoneNumber = (e) => {
		setPhoneNumber(
			e.target.value
				.replace(/[^0-9]/g, '')
				.replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, '$1-$2-$3')
				.replace(/(\-{1,2})$/g, '')
		);
	};

	const handleVerifyNumber = (e) => {
		setVerifyNumber(e.target.value.replace(/[^0-9]/g, ''));
	};

	// 서버에게 token 전송
	const loginAxios = async () => {
		try {
			const res = await axios.post('/user/login', { token: accessToken });
			console.log(res);
			console.log(accessToken);
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
		<div className="identity-verification">
			<SubHeader headertext={'본인인증'} />
			<div className="iv-body">
				<div className="iv-title">
					<div className="ivt-main">휴대폰 본인인증</div>
					<div className="ivt-sub">유니버스 생성 및 신청, 시작일 리마인드 알림을</div>
					<div className="ivt-sub">문자 메시지로 보내드려요 :)</div>
				</div>
				<div className="iv-form">
					<div className="ivf-input-group">
						<input
							type="text"
							onChange={handlePhoneNumber}
							maxLength="13"
							placeholder="010-0000-0000"
							value={phoneNumber}
							className="ivf-input"
						/>
						<img src={CheckBtn} alt="확인 버튼" className="ivf-img" />
					</div>
					<div className="ivf-input-group">
						<div className="ivf-title">인증번호</div>
						<input
							type="text"
							onChange={handleVerifyNumber}
							maxLength="6"
							placeholder="000000"
							value={verifyNumber}
							className="ivf-input"
						/>
						<img src={CheckBtn} alt="확인 버튼" className="ivf-img" />
						<div className="ivf-error-message">인증번호가 일치하지 않습니다. 다시 시도해 주세요.</div>
					</div>
				</div>
				<Button content={'다음'} type={'floating'} />
			</div>
			<NavBar />
		</div>
	);
}
