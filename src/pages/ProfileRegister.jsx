import Button from '../components/Button';
import { SubHeader } from '../components/Header';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import '../pages/ProfileRegister.scss';

const ProfileRegister = () => {
	const regex = /^\d{9}$/;

	const [isOverlap, setIsOverlap] = useState(0); // 초기 상태 0, 중복 안 됨 1, 중복됨 2
	const [nickname, setNickname] = useState('');
	const [gender, setGender] = useState(0); // 초기 상태 0, 남성 1, 여성 2
	const [majorFontColor, setMajorFontColor] = useState('--select-default-color');
	const [major, setMajor] = useState('');
	const [classof, setClassof] = useState('');

	const navigate = useNavigate();

	window.addEventListener('popstate', function(event) {
		navigate('/register');
	});

	const handleChangeNickname = (e) => {
		setNickname(e.target.value);
	};

	const handleClickOverlapButton = () => {
		axios({
			method: 'post',
			url: 'https://univeus.site/user/nickname/check',
			data: {
				nickname: nickname,
			},
		}).then((res) => {
			if (res.data.isSuccess === true) {
				setIsOverlap(1);
			} else {
				setIsOverlap(2);
			}
		});
	};

	const handleClickMaleInput = () => {
		setGender(1);
	};

	const handleClickFemaleInput = () => {
		setGender(2);
	};

	const handleSelectMajor = (e) => {
		setMajor(e.target.value);
		setMajorFontColor('--black-color');
	};

	const handleChangeClassof = (e) => {
		setClassof(e.target.value);
	};

	const jwtToken = sessionStorage.getItem('accessToken');

	// 헤더에 액세스 토큰 추가하는 부분 구현 완료
	const handleClickStartButton = () => {
		axios({
			headers: {
				'x-access-token': jwtToken,
			},
			method: 'post',
			url: 'https://univeus.site/user/start/univeus',
			data: {
				nickname: nickname,
				gender: gender, // 1 : man 2 : woman
				major: major,
				studentId: classof,
			},
		}).then((response) => {
			if (response.data.code === 5000 || response.data.code === 5001) {
				navigate('/');
			} else if (response.data.code === 1000) {
				navigate('/home');
			} else {
				navigate('/');
			}
		});
	};

	return (
		<div className="ProfileRegister">
			<SubHeader headertext={'프로필 등록'} />
			<div className="profileregisterbody">
				<div className="nicknameinputcontainer">
					<p className="inputtitle">닉네임</p>
					<div className="inputcontainer">
						<input
							type="text"
							className="nicknameinput"
							placeholder="닉네임을 입력해주세요"
							value={nickname}
							onChange={handleChangeNickname}
						/>
						<Button content={'중복확인'} onClick={handleClickOverlapButton} />
					</div>
					{isOverlap === 1 ? (
						<p className="overlapresulttext" style={{ color: `var(--deep-blue-color)` }}>
							{'사용가능한 닉네임입니다 :)'}
						</p>
					) : isOverlap === 2 ? (
						<p className="overlapresulttext" style={{ color: `var(--orange-color)` }}>
							{'이미 사용중인 닉네임입니다 :('}
						</p>
					) : (
						<p className="overlapresulttext"></p>
					)}
				</div>
				<div className="genderinputcontainer">
					<p className="inputtitle">성별</p>
					<div className="checkboxcontainer">
						<div className="malecheckbox">
							<input type="radio" name="check" onClick={handleClickMaleInput} />
							<p className="gendertype">남</p>
						</div>
						<div className="femalecheckbox">
							<input type="radio" name="check" onClick={handleClickFemaleInput} />
							<p className="gendertype">여</p>
						</div>
					</div>
				</div>
				<div className="majorselectcontainer">
					<p className="inputtitle">소속학부</p>
					<select
						name=""
						className="majorselect"
						onChange={handleSelectMajor}
						required
						style={{ color: `var(${majorFontColor})` }}
					>
						<option value="defaulttext" className="defaulttext" disabled selected>
							본인 학부를 선택하여주세요
						</option>
						<option value="인문대학">인문대학</option>
						<option value="예술체육대학">예술체육대학</option>
						<option value="사회과학대학">사회과학대학</option>
						<option value="소프트웨어경영대학">소프트웨어경영대학</option>
						<option value="융합과학대학">융합과학대학</option>
						<option value="창의공과대학">창의공과대학</option>
						<option value="관광문화대학">관광문화대학</option>
					</select>
				</div>
				<div className="class_of_container">
					<p className="inputtitle">학번</p>
					<input
						type="text"
						className="class_of_input"
						placeholder="ex) 201912112"
						value={classof}
						onChange={handleChangeClassof}
					/>
					{regex.test(classof) === true ? (
						<p className="class_of_length_check"></p>
					) : (
						<p className="class_of_length_check">학번 형식이 올바르지 않습니다.</p>
					)}
				</div>
				<div className="startbutton">
					{isOverlap === 1 && nickname !== '' && gender !== 0 && regex.test(classof) === true ? (
						<Button type={'floating'} content={'유니버스 시작하기'} onClick={handleClickStartButton} />
					) : (
						<Button type={'floating disabled'} content={'미입력된 항목이 있습니다'} />
					)}
				</div>
			</div>
		</div>
	);
};

export default ProfileRegister;
