import './RegisterProfile.scss';
import { SubHeader } from '../components/Header';
import NavBar from '../components/NavBar';
import Button from '../components/Button';
import CheckBtn from '../assets/images/arrow_circle.svg';
import Person from '../assets/images/person_fill.svg';
import { ReactComponent as Pencil } from '../assets/images/write.svg';
import { useRef, useState } from 'react';

export default function ProfileChange() {
	const [nickName, setNickName] = useState('');
	const [profileImg, setProfileImg] = useState('');

	const imgRef = useRef();

	const handleNickName = (e) => {
		setNickName(e.target.value);
	};

	const saveImgFile = () => {
		const file = imgRef.current.files[0];
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onloadend = () => {
			setProfileImg(reader.result);
		};
	};

	return (
		<div className="register-profile">
			<SubHeader headertext={'프로필 등록'} />
			<div className="rp-body">
				<div className="rp-img-form">
					<label htmlFor="rpi-img-input">
						<img
							className="rpi-profile-img"
							src={profileImg ? profileImg : Person}
							alt="프로필 이미지"
							style={{
								width: profileImg ? '' : '47px',
								height: profileImg ? '' : '47px',
								borderRadius: profileImg ? '' : '0px',
							}}
						/>
						{profileImg ? <></> : <Pencil className="rpi-pencil-img" />}
						{/* <Pencil className="rpi-pencil-img" /> */}
					</label>
					<input
						type="file"
						accept="image/*"
						id="rpi-img-input"
						onChange={saveImgFile}
						ref={imgRef}
						style={{ display: 'none' }}
					/>
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
						<img src={CheckBtn} alt="확인 버튼" className="rp-img" />
					</div>
				</div>
				<Button type={'floating'} content={'완료'} />
			</div>
			<NavBar />
		</div>
	);
}
