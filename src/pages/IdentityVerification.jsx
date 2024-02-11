import './IdentityVerification.scss';
import { SubHeader } from '../components/Header';
import NavBar from '../components/NavBar';
import Button from '../components/Button';
import CheckBtn from '../assets/images/arrow_circle.svg';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function IdentityVerification() {
	const jwtToken = sessionStorage.getItem('accessToken');
	const [phoneNumber, setPhoneNumber] = useState('');
	const [verifyNumber, setVerifyNumber] = useState('');
	const [message, setMessage] = useState(''); // notPhoneNumber, notAccessNumber, successAccess, inconsistency, postAccessNumber

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

	const phoneRequestPost = async () => {
		const phone = phoneNumber.replace(/-/g, '');
		const res = await axios.post('/user/send/number', {
			phoneNumber: phone,
		});
		console.log(res);

		const code = res.data.code;
		if (code === 'COMMON200') {
			setMessage('postAccessNumber');
		} else if (code === 'USER0003' || code === 'USER0005') {
			setMessage('notPhoneNumber');
		}
	};

	const phoneCheckPost = async () => {
		const phone = phoneNumber.replace(/-/g, '');
		const res = await axios.post(
			'/user/auth/number',
			{
				phoneNumber: phone,
				number: verifyNumber,
			},
			{
				headers: {
					'x-access-token': jwtToken,
				},
			}
		);
		console.log(res);

		const code = res.data.code;
		if (code === 'COMMON200') {
			// 인증 성공
			setMessage('successAccess');
		} else if (code === 'USER0006') {
			// 이미 인증 완료
			navigator('/signup/terms-of-use');
		} else if (code === 'USER0003') {
			// 핸드폰 번호 입력 X
			setMessage('notPhoneNumber');
		} else if (code === 'USER0007') {
			// 인증번호 입력 X
			setMessage('notAccessNumber');
		} else if (code === 'USER0008') {
			// 인증번호가 올바르지 않을때
			setMessage('inconsistency');
		} else if (code === 5000) {
			// 토큰 headers에 없음
			// navigator();
		} else if (code === 5001) {
			// 토큰 만료
			// navigator();
		}
	};

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
						<img
							src={CheckBtn}
							alt="확인 버튼"
							className="ivf-img"
							onClick={() => {
								phoneRequestPost();
							}}
						/>
						{message === 'notPhoneNumber' ? (
							<div className="ivf-error-message">핸드폰 번호를 입력해주세요.</div>
						) : message === 'postAccessNumber' ? (
							<div className="ivf-error-message" style={{ color: 'var(--deep-blue-color)' }}>
								인증번호가 전송되었습니다.
							</div>
						) : (
							''
						)}
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
						<img
							src={CheckBtn}
							alt="확인 버튼"
							className="ivf-img"
							onClick={() => {
								phoneCheckPost();
							}}
						/>
						{message === 'successAccess' ? (
							<div className="ivf-error-message" style={{ color: 'var(--deep-blue-color)' }}>
								인증번호 확인이 완료되었습니다.
							</div>
						) : message === 'notAccessNumber' ? (
							<div className="ivf-error-message">인증번호를 입력하지 않았습니다.</div>
						) : message === 'inconsistency' ? (
							<div className="ivf-error-message">인증번호가 일치하지 않습니다.</div>
						) : (
							''
						)}
					</div>
				</div>
				<Button content={'다음'} type={'floating'} />
			</div>
			<NavBar />
		</div>
	);
}
