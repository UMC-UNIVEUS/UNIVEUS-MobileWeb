import './OtherUserProfile.scss';
import { SubHeader } from '../components/Header';
import NavBar from '../components/NavBar';
import Modal from '../components/Modal';
import Button from '../components/Button';
import Declaration from '../assets/images/declaration.svg';
import Profile from '../components/Profile';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function OtherUserProfile() {
	const jwtToken = sessionStorage.getItem('accessToken');
	const { id } = useParams();
	const QUESTION = [
		'나의 MBTI는',
		'나의 최애 음식은',
		'내가 요새 듣는노래는',
		'나의 관심사는',
		'이런 사람이랑 잘 맞아요',
		'대학생활동안 제일 해보고 싶은건',
	];
	const [notUserIntro, setNotUserIntro] = useState(false);
	const [notExistUser, setNotExistUser] = useState(false);
	const [declaration, setDeclaration] = useState();
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [userData, setUserData] = useState({
		userInfo: {
			nickname: '',
			gender: '',
			major: '',
			student_id: '',
			mebership: '',
			user_img: '',
			making: '',
			participating: '',
			introductionExist: '',
		},

		userIntroduction: {
			q1: '',
			q2: '',
			q3: '',
			q4: '',
			q5: '',
			q6: '',
		},
	});

	const userAnswer = Object.values(userData.userIntroduction);

	const openModal = () => setIsModalOpen(true);
	const closeModal = () => {
		setIsModalOpen(false);
		setDeclaration();
	};

	const axiosUserInfo = async () => {
		try {
			const res = await axios.get(`/profile/introduction/${id}`, {
				headers: {
					'x-access-token': jwtToken,
				},
			});
			console.log(res);
			// console.log(res.data.result.userIntroduction.code);
			if (res.data.result.userInfo.code === 'PROFILE0004') {
				setNotExistUser(true);
			} else if (res.data.result.userIntroduction.code === 'PROFILE0001') {
				setNotUserIntro(true);
			} else {
				setUserData(res.data.result);
			}
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		axiosUserInfo();
	}, []);

	return (
		<div className="other-user-profile">
			<SubHeader headertext={'유저 프로필'} iconBtn={Declaration} onClick={openModal} />
			<Modal isOpen={isModalOpen} closeModal={closeModal} title={'이 유저를 신고하시겠어요?'}>
				<p style={{ color: 'rgba(0, 0, 0, 0.60)' }}>신고 사유를 선택해 주시면 확인 후 조치가 취해집니다.</p>
				<div className="oup-radio-box">
					{[
						['불건전한 언행을 사용해요.', 1],
						['불건전한 프로필을 게시했어요.', 2],
						['광고, 홍보성 게시글을 게시했어요.', 3],
						['부적절한 이미지를 게시했어요.', 4],
						['기타(확인 후 조치를 취해주세요)', 5],
					].map((message) => {
						return (
							<div className="oup-radio-group">
								<input
									className="oup-radio"
									type="radio"
									name="gender"
									id={message[1]}
									onClick={() => {
										setDeclaration(message[1]);
									}}
								/>
								<label htmlFor={message[1]}>{message[0]}</label>
							</div>
						);
					})}
				</div>
				<div className="modal-btn-group">
					<Button content={'취소하기'} type={'modal-btn other-color'} onClick={closeModal} />
					<Button content={'신고하기'} type={'modal-btn'} />
				</div>
			</Modal>
			<div className="oup-body">
				{notExistUser ? (
					<div className="oup-not-exist-user">존재하지 않는 유저입니다.</div>
				) : (
					<>
						<div className="oup-profile-box">
							<Profile />
							<div className="oup-info-group">
								<div className="oup-info-name">{userData.userInfo.nickname}</div>
								<div className="oup-info-department">
									{userData.userInfo.student_id}/{userData.userInfo.major}
								</div>
							</div>
							<div className="oup-number-group">
								<div className="oup-number">
									<div className="oup-number-title">생성</div>
									<div className="oup-number-result">{userData.userInfo.making}회</div>
								</div>
								<div className="oup-number">
									<div className="oup-number-title">참여</div>
									<div className="oup-number-result">{userData.userInfo.participating}회</div>
								</div>
							</div>
						</div>
						{notUserIntro ? (
							<div className="oup-not-user-intro">작성한 내용이 없어요!</div>
						) : (
							<div className="oup-introduction-box">
								{userAnswer.map((answer, idx) => {
									return (
										<div className="oup-qa-box">
											<div className="oup-question-group">
												<div className="oup-dot">&#183;</div>
												<div className="oup-question">{QUESTION[idx]}</div>
											</div>
											<div className="oup-answer">{answer ? answer : '답변을 입력하지 않았습니다.'}</div>
										</div>
									);
								})}
							</div>
						)}
					</>
				)}
			</div>
			<NavBar />
		</div>
	);
}
