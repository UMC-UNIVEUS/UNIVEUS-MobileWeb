import './ProfileChange.scss';
import { SubHeader } from '../components/Header';
import DeleteBtn from '../assets/images/delete.svg';
import NavBar from '../components/NavBar';
import Button from '../components/Button';
import Modal from '../components/Modal';
import CheckBtn from '../assets/images/arrow_circle.svg';
import Person from '../assets/images/person_fill.svg';
import { ReactComponent as Pencil } from '../assets/images/write.svg';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function ProfileChange() {
	const MAXSIZE = 1 * 1024 * 1024;
	const [nickName, setNickName] = useState('');
	const [imgFile, setImgFile] = useState('');
	const [errorImg, setErrorImg] = useState(false);

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

	// 채연 토큰
	const jwtToken =
		'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEwLCJpYXQiOjE3MDU0NzE2MjMsImV4cCI6MTcxNDExMTYyMywiaXNzIjoidW5pdmV1cyJ9.FZ5uso5nr375V9N9IIT14KiKAW5GjPLZxWiFYsSdoAQ';

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

	// 내 프로필 조회
	const myProfileGet = async () => {
		try {
			const res = await axios.get('/profile/userInfo', {
				headers: {
					'x-access-token': jwtToken,
				},
			});
			console.log(res);
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

	console.log('img', imgFile);
	console.log('nickname', nickName);

	useEffect(() => {
		myProfileGet();
	}, []);

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
						<img src={CheckBtn} alt="닉네임 중복 확인 버튼" className="rp-img" />
					</div>
				</div>
				<Button
					type={'floating'}
					content={'완료'}
					onClick={() => {
						myProfileChange();
					}}
				/>
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
