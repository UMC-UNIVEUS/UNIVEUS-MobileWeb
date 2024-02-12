import './ProfileChange.scss';
import { SubHeader } from '../components/Header';
import DeleteBtn from '../assets/images/delete.svg';
import NavBar from '../components/NavBar';
import Button from '../components/Button';
import Modal from '../components/Modal';
import CheckBtn from '../assets/images/arrow_circle.svg';
import Person from '../assets/images/person_fill.svg';
import ContainsSpecialCharacter from '../utils/ContainsSpecialCharacter.jsx';
import { ReactComponent as Pencil } from '../assets/images/write.svg';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function ProfileChange() {
	const jwtToken = sessionStorage.getItem('accessToken');
	const MAXSIZE = 1 * 1024 * 1024;
	const [isNickname, setIsNickname] = useState('');
	const [nickName, setNickName] = useState('');
	const [imgFile, setImgFile] = useState('');
	const [errorImg, setErrorImg] = useState(false);
	const [message, setMessage] = useState(''); // nicknameDuplicate, nicknameAvailable, nicknameUnavailable

	const navigate = useNavigate();
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
				url: '/post/image/upload?directory=profile',
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
				'/user/nickname/check',
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

	// 내 프로필 조회
	const myProfileGet = async () => {
		try {
			const res = await axios.get('/profile/userInfo', {
				headers: {
					'x-access-token': jwtToken,
				},
			});
			console.log(res);
			setIsNickname(res.data.result.userInfo['nickname']);
			setNickName(res.data.result.userInfo['nickname']);
			setImgFile(res.data.result.userInfo['user_img']);
		} catch (error) {
			console.log(error);
		}
	};

	// 프로필 변경
	const myProfileChange = async () => {
		try {
			const res = await axios.put(
				'/profile/mypage',
				{
					nickname: nickName,
					user_img: imgFile,
				},
				{
					headers: {
						'x-access-token': jwtToken,
					},
				}
			);
			console.log(res);
			navigate('/mypage');
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		myProfileGet();
	}, []);

	return (
		<div className="register-profile">
			<SubHeader headertext={'프로필 등록'} />
			<div className="pc-body">
				<div className="pc-img-form">
					<label htmlFor="pci-img-input">
						<img
							className="pci-profile-img"
							src={imgFile ? imgFile : Person}
							alt="프로필 이미지"
							style={{
								width: imgFile ? '' : '47px',
								height: imgFile ? '' : '47px',
								borderRadius: imgFile ? '' : '0px',
							}}
						/>
						{imgFile ? <></> : <Pencil className="pci-pencil-img" />}
					</label>
					<input
						type="file"
						accept="image/*"
						id="pci-img-input"
						onChange={saveImgFile}
						ref={imgRef}
						style={{ display: 'none' }}
					/>
					<div className="pci-delete">
						{imgFile ? (
							<img
								className="pci-delete-img"
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
				<div className="pc-form">
					<div className="pc-input-group">
						<input
							type="text"
							onChange={handleNickName}
							maxLength="13"
							placeholder="닉네임을 입력해주세요"
							value={nickName}
							className="pc-input"
						/>
						<img
							src={CheckBtn}
							alt="닉네임 중복 확인 버튼"
							className="pc-img"
							onClick={() => {
								checkNickname();
							}}
						/>
					</div>
					<span
						className="pc-message-text"
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
				</div>
				{isNickname !== nickName ? (
					<Button type={'floating disabled'} content={'완료'} />
				) : (
					<Button
						type={'floating'}
						content={'완료'}
						onClick={() => {
							myProfileChange();
						}}
					/>
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
