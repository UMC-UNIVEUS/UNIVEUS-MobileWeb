import Button from '../components/Button';
import { SubHeader } from '../components/Header';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import '../pages/Verification.scss';

import { ReactComponent as Check } from '../assets/images/check.svg';
import { ReactComponent as RedCheck } from '../assets/images/redcheck.svg';

const Verification = () => {
	const navigate = useNavigate();

	const jwtToken = sessionStorage.getItem('accessToken');

	const [isVerified, setIsVerified] = useState(0); // 초기 상태 0, 인증 성공 1, 인증 실패 2
	const [phoneNumber, setPhoneNumber] = useState('');
	const [verifyNumber, setVerifyNumber] = useState('');

	const [isCheckedAll, setIsCheckedAll] = useState(false);
	const [isChecked1, setIsChecked1] = useState(false);
	const [isChecked2, setIsChecked2] = useState(false);
	const [isChecked3, setIsChecked3] = useState(false);

	const handleCheckAll = () => {
		setIsCheckedAll(!isCheckedAll);
		if (isCheckedAll === true) {
			setIsChecked1(false);
			setIsChecked2(false);
			setIsChecked3(false);
		} else {
			setIsChecked1(true);
			setIsChecked2(true);
			setIsChecked3(true);
		}
	};

	const handleCheck1 = () => {
		setIsChecked1(!isChecked1);
		if (isChecked2 === true && isChecked3 === true) {
			setIsCheckedAll(true);
		}
		if (isChecked1 === true) {
			setIsCheckedAll(false);
		}
	};

	const handleCheck2 = () => {
		setIsChecked2(!isChecked2);
		if (isChecked1 === true && isChecked3 === true) {
			setIsCheckedAll(true);
		}
		if (isChecked2 === true) {
			setIsCheckedAll(false);
		}
	};

	const handleCheck3 = () => {
		setIsChecked3(!isChecked3);
		if (isChecked1 === true && isChecked2 === true) {
			setIsCheckedAll(true);
		}
		if (isChecked3 === true) {
			setIsCheckedAll(false);
		}
	};

	const handleChangePhoneNumber = (e) => {
		setPhoneNumber(e.target.value);
	};

	const handleChangeVerifyNumber = (e) => {
		setVerifyNumber(e.target.value);
	};

	const handleSendVerifyCode = () => {
		axios({
			method: 'post',
			url: '/user/send/number',
			data: {
				phoneNumber: phoneNumber,
			},
		}).then((res) => {
			console.log(res.message);
		});
	};

	const handleClickVerifyButton = () => {
		axios({
			headers: {
				'x-access-token': jwtToken,
			},
			method: 'post',
			url: '/user/auth/number',
			data: {
				phoneNumber: phoneNumber,
				number: parseInt(verifyNumber),
			},
		}).then((response) => {
			if (response.data.result.code === 5000 || response.data.result.code === 5001) {
				navigate('/');
			} else if (response.data.code === 2012) {
				setIsVerified(1);
			} else {
				setIsVerified(2);
			}
		});
	};

	const handleClickNextButton = () => {
		axios({
			header: {
				'x-access-token': jwtToken,
			},
			method: 'post',
			url: '/user/agreement',
			data: {
				userAgreement: [1, 1, 1],
			},
		}).then((response) => {
			if (response.data.result.code === 5000 || response.data.result.code === 5001) {
				navigate('/');
			} else {
				navigate('/register');
			}
		});
	};

	return (
		<div className="Verification">
			<SubHeader headertext={'본인인증'} />
			<div className="verificationbody">
				<div className="verifytext">
					<p className="verifytitletext">휴대폰 본인인증</p>
					<p className="verifysubtext">
						{'유니버스 생성 및 신청, 시작일 리마인드 알림을'}
						<br /> {'문자 메시지로 보내드려요 :)'}
					</p>
				</div>
				<div className="phonenuminputcontainer">
					<p className="inputtitle">전화번호</p>
					<div className="inputcontainer">
						<input
							type="text"
							className="phonenuminput"
							placeholder="전화번호를 입력해주세요"
							value={phoneNumber}
							onChange={handleChangePhoneNumber}
						/>
						<Button content={'인증번호 받기'} onClick={handleSendVerifyCode} />
					</div>
				</div>
				<div className="verifyinputcontainer">
					<p className="inputtitle">인증번호</p>
					<div className="inputcontainer">
						<input
							type="text"
							className="verifyinput"
							placeholder="인증번호를 입력해주세요"
							value={verifyNumber}
							onChange={handleChangeVerifyNumber}
						/>
						<Button content={'확인'} onClick={handleClickVerifyButton} />
					</div>
					{isVerified === 1 ? (
						<p className="verifyresulttext" style={{ color: `var(--deep-blue-color)` }}>
							{'인증이 완료되었습니다.'}
						</p>
					) : isVerified === 2 ? (
						<p className="verifyresulttext" style={{ color: `var(--orange-color)` }}>
							{'잘못된 인증번호 입니다. 다시 시도해 주세요 :('}
						</p>
					) : (
						<p className="verifyresulttext"></p>
					)}
				</div>
				<div className="agreecontainer">
					<div className="checkline">
						<button onClick={handleCheckAll} className="checkbutton">
							{isCheckedAll ? <RedCheck /> : <Check />}
						</button>
						<p className="allchecktext">약관 전체동의</p>
					</div>
					<div className="horizontal_bar"></div>
					<div className="each_check_container">
						<div className="each_check">
							<div className="checkline">
								<button onClick={handleCheck1} className="checkbutton">
									{isChecked1 ? <RedCheck /> : <Check />}
								</button>
								<p className="eachchecktext">이용약관 동의</p>
							</div>
							<a
								href="https://univeus.oopy.io/c9401d02-7c38-41f5-ba28-8bcf1d857d8a"
								target="_blank"
								rel="noopener noreferrer"
								className="termslink"
							>
								보기
							</a>
						</div>
						<div className="each_check">
							<div className="checkline">
								<button onClick={handleCheck2} className="checkbutton">
									{isChecked2 ? <RedCheck /> : <Check />}
								</button>
								<p className="eachchecktext">개인정보 제공 및 활용 동의</p>
							</div>
							<a
								href="https://univeus.oopy.io/4f621393-467a-4e61-b8f8-76ada7cc9b99"
								target="_blank"
								rel="noopener noreferrer"
								className="termslink"
							>
								보기
							</a>
						</div>
						<div className="each_check">
							<div className="checkline">
								<button onClick={handleCheck3} className="checkbutton">
									{isChecked3 ? <RedCheck /> : <Check />}
								</button>
								<p className="eachchecktext">문자 수신 동의</p>
							</div>
							<a
								href="https://univeus.oopy.io/6157f35b-c400-4cc5-baa5-235de47b255a"
								target="_blank"
								rel="noopener noreferrer"
								className="termslink"
							>
								보기
							</a>
						</div>
					</div>
				</div>
				<div className="nextbutton">
					{isVerified === 1 && isCheckedAll === true ? (
						<Button type={'floating'} content={'다음'} onClick={handleClickNextButton} />
					) : (
						<Button type={'floating disabled'} content={'다음'} />
					)}
				</div>
			</div>
		</div>
	);
};

export default Verification;
