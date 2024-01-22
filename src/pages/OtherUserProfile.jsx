import './OtherUserProfile.scss';
import { SubHeader } from '../components/Header';
import NavBar from '../components/NavBar';
import Modal from '../components/Modal';
import Button from '../components/Button';
import Declaration from '../assets/images/declaration.svg';
import Profile from '../components/Profile';
import { useState } from 'react';

export default function OtherUserProfile() {
	const [declaration, setDeclaration] = useState();
	const [isModalOpen, setIsModalOpen] = useState(false);
	const openModal = () => setIsModalOpen(true);
	const closeModal = () => {
		setIsModalOpen(false);
		setDeclaration();
	};
	console.log(declaration);

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
				<div className="oup-profile-box">
					<Profile />
					<div className="oup-info-group">
						<div className="oup-info-name">소하</div>
						<div className="oup-info-department">19학번/소프트웨어경영대학</div>
					</div>
					<div className="oup-number-group">
						<div className="oup-number">
							<div className="oup-number-title">생성</div>
							<div className="oup-number-result">1회</div>
						</div>
						<div className="oup-number">
							<div className="oup-number-title">참여</div>
							<div className="oup-number-result">2회</div>
						</div>
					</div>
				</div>
				<div className="oup-introduction-box">
					{[
						['나의 MBTI는', 'ISFP'],
						['나의 최애 음식은', '치킨'],
					].map((li) => {
						return (
							<div className="oup-qa-box">
								<div className="oup-question-group">
									<div className="oup-dot">&#183;</div>
									<div className="oup-question">{li[0]}</div>
								</div>
								<div className="oup-answer">{li[1]}</div>
							</div>
						);
					})}
				</div>
			</div>
			<NavBar />
		</div>
	);
}
