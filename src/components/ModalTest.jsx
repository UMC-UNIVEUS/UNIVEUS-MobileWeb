import { useState } from 'react';
import Modal from './Modal';

export default function ModalTest() {
	// modal창 여닫기
	const [isModalOpen, setIsModalOpen] = useState(false);
	const openModal = () => setIsModalOpen(true);
	const closeModal = () => setIsModalOpen(false);
	return (
		<>
			<button className="secession-btn" onClick={openModal}>
				모달 오픈 버튼
			</button>
			<Modal
				isOpen={isModalOpen}
				closeModal={closeModal}
				title={'정말 탈퇴하시겠습니까?'}
				content={'"탈퇴 후 재가입은 7일 후 가능하며 기존 멤버쉽 혜택은 사라집니다."'}
			/>
		</>
	);
}
