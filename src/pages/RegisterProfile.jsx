import './RegisterProfile.scss';
import { SubHeader } from '../components/Header';
import NavBar from '../components/NavBar';
import Button from '../components/Button';
import CheckBtn from '../assets/images/arrow_circle.svg';
import DeleteBtn from '../assets/images/delete.svg';
import Person from '../assets/images/person_fill.svg';
import { ReactComponent as Pencil } from '../assets/images/write.svg';
import Modal from '../components/Modal';
import ContainsSpecialCharacter from '../utils/ContainsSpecialCharacter.jsx';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function RegisterProfile() {
	const jwtToken = sessionStorage.getItem('accessToken');
	const navigate = useNavigate();
	const MAXSIZE = 1 * 1024 * 1024;
	const [isNickname, setIsNickname] = useState('');
	const [nickName, setNickName] = useState('');
	const [gender, setGender] = useState('MAN'); // MAN, WOMAN
	const [imgFile, setImgFile] = useState('');
	const [errorImg, setErrorImg] = useState(false);
	const [message, setMessage] = useState(''); // nicknameDuplicate, nicknameAvailable, nicknameUnavailable

	const imgRef = useRef();

	const handleNickName = (e) => {
		setNickName(e.target.value);
	};

	const openErrorModal = () => {
		setErrorImg(true);
	};

	const closeErrorModal = () => {
		setErrorImg(false);
	};

	// 이미지 업로드 input의 onChange
	const saveImgFile = (e) => {
		const file = imgRef.current.files[0];

		e.preventDefault();
		const formData = new FormData();
		formData.append('image', file);

		if (file.size >= MAXSIZE) {
			openErrorModal();
		} else {
			axios({
				headers: {
					'x-access-token': jwtToken,
					'Content-Type': 'multipart/form-data',
				},
				method: 'post',
				url: 'https://univeus.site/post/image/upload?directory=profile',
				data: formData,
			})
				.then((res) => {
					const updatedImgFile = [res.data.result[0]['pic_url']];
					setImgFile(updatedImgFile);
				})
				.catch((err) => {
					console.log('err : ', err);
				});
		}
	};

	// 닉네임 중복확인
	const checkNickname = async () => {
		const specialCharacter = ContainsSpecialCharacter(nickName);
		if (nickName.length > 1 && !specialCharacter) {
			const res = await axios.post(
				'https://univeus.site/user/nickname/check',
				{
					nickname: nickName,
				},
				{
					headers: {
						'x-access-token': jwtToken,
					},
				}
			);
			console.log(res);
			if (res.data.code === 'COMMON200') {
				setMessage('nicknameAvailable');
				setIsNickname(nickName);
			} else if (res.data.code === 2014) {
				setMessage('nicknameDuplicate');
			}
		} else {
			setMessage('nicknameUnavailable');
		}
	};

	// 프로필 등록
	const profilePost = async () => {
		const res = await axios.post(
			'https://univeus.site/user/register/profile',
			{
				nickname: nickName,
				gender: gender,
				profile_img: imgFile,
			},
			{
				headers: {
					'x-access-token': jwtToken,
				},
			}
		);
		console.log(res);
		navigate('/home');
	};

	return (
		<div className="register-profile">
			<SubHeader headertext={'프로필 등록'} />
			<div className="rp-body">
				<div className="rp-img-form">
					<label htmlFor="rpi-img-input">
						<img
							className="rpi-profile-img"
							src={imgFile ? imgFile : Person}
							alt="프로필 이미지"
							style={{
								width: imgFile ? '' : '47px',
								height: imgFile ? '' : '47px',
								borderRadius: imgFile ? '' : '0px',
							}}
						/>
						{imgFile ? <></> : <Pencil className="rpi-pencil-img" />}
					</label>
					<input
						type="file"
						accept="image/*"
						id="rpi-img-input"
						onChange={saveImgFile}
						ref={imgRef}
						style={{ display: 'none' }}
					/>
					<div className="rpi-delete">
						{imgFile ? (
							<img
								className="rpi-delete-img"
								src={DeleteBtn}
								alt="이미지 삭제 버튼"
								onClick={() => {
									setImgFile('');
								}}
							/>
						) : (
							<></>
						)}
					</div>
				</div>
				<div className="rp-form">
					<div className="rp-input-group">
						<input
							type="text"
							onChange={handleNickName}
							maxLength="13"
							placeholder="닉네임을 입력해주세요"
							value={nickName}
							className="rp-input"
						/>
						<img
							src={CheckBtn}
							alt="확인 버튼"
							className="rp-img"
							onClick={() => {
								checkNickname();
							}}
						/>
					</div>
					<span
						className="rp-message-text"
						style={{ color: message === 'nicknameAvailable' ? 'var(--deep-blue-color)' : '' }}
					>
						{message === 'nicknameAvailable'
							? '사용 가능한 닉네임입니다.'
							: message === 'nicknameDuplicate'
							? '중복된 닉네임입니다.'
							: message === 'nicknameUnavailable'
							? '올바르지 않은 형식입니다. (글자수 2~13자, 특수문자 미포함)'
							: ''}
					</span>
					<div className="rp-radio-group">
						<input
							className="rp-radio"
							type="radio"
							name="gender"
							id="male"
							defaultChecked
							onClick={() => {
								setGender('MAN');
							}}
						/>
						<label htmlFor="male">남성</label>
					</div>
					<div className="rp-radio-group">
						<input
							className="rp-radio"
							type="radio"
							name="gender"
							id="female"
							onClick={() => {
								setGender('WOMAN');
							}}
						/>
						<label htmlFor="female">여성</label>
					</div>
				</div>
				{nickName !== '' && gender !== '' && nickName === isNickname ? (
					<Button
						type={'floating'}
						content={'완료'}
						onClick={() => {
							profilePost();
						}}
					/>
				) : (
					<Button type={'floating disabled'} content={'완료'} />
				)}
			</div>
			<Modal isOpen={errorImg} closeModal={closeErrorModal} title={'이미지 업로드 실패!'}>
				<p style={{ color: 'rgba(0, 0, 0, 0.60)' }}>업로드가 불가능한 이미지입니다.</p>
				<p style={{ color: 'rgba(0, 0, 0, 0.60)' }}>다른 이미지를 선택해주세요!</p>
				<p style={{ color: 'rgba(241, 52, 52, 0.935)' }}>업로드 불가 사유: 업로드 불가 확장자 혹은 용량</p>
				<Button type={'floating'} content={'확인'} onClick={closeErrorModal} />
			</Modal>
			<NavBar />
		</div>
	);
}
