import { useState } from 'react';
import Modal from './Modal';
import Button from './Button';

export default function ModalTest() {
	// modal창 여닫기
	const [isModalOpen, setIsModalOpen] = useState(false);
	const openModal = () => setIsModalOpen(true);
	const closeModal = () => setIsModalOpen(false);
	return (
		<>
			<Button className="secession-btn" onClick={openModal} content={'모달 오픈'} />

			<Modal
				isOpen={isModalOpen}
				closeModal={closeModal}
				title={'정말 탈퇴하시겠습니까?'}
				content={'"탈퇴 후 재가입은 7일 후 가능하며 기존 멤버쉽 혜택은 사라집니다."'}
			/>
		</>
	);
}
