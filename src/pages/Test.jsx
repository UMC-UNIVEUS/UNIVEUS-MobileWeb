import ModalTest from '../components/ModalTest';
import Button from '../components/Button';
import CreateDetail from './CreateDetail';
import CreateIntro from './CreateIntro';
import MyFeed from './MyFeed';
import Modal from '../components/Modal';
import { useState } from 'react';
import { MainHeader, SubHeader } from '../components/Header';
import NavBar from '../components/NavBar';
import Icon from '../assets/images/Insta.svg';
import Profile from '../components/Profile';
import Card from '../components/Card';
import Toggle from '../components/Toggle';

export default function Test() {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const openModal = () => setIsModalOpen(true);
	const closeModal = () => setIsModalOpen(false);
	return (
		<div>
			{/* MainHeader에 rightNonDisplay props를 추가하면 오른쪽 아이콘들이 사라짐 */}
			{/* <MainHeader rightNonDisplay /> */}
			{/* SubHeader에 headerText는 필수. iconBtn에는 사용할 아이콘 작성 및 navLink에는 모달 오픈 작성. textBtn에는 문구 작성, 기본 글 색상 비활성화 색상, 버튼 활성화 할 시에 navLink에 이동할 링크 작성 및 style에 글자 색상 딥블루 입력  */}
			{/* <SubHeader headertext={'상세정보 입력'} iconBtn={Icon} onClick={openModal} /> */}
			<SubHeader headertext={'입력'} textBtn={'완료'} />
			<div style={{ width: '90%', height: '100%', margin: '0 auto', paddingTop: '52px' }}>
				<div>존재하지 않는 유니버스입니다!</div>
				{/* <Profile gender={'male'} />
				<Toggle />
				<div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
					<Card />
					<Card />
				</div> */}
				{/* Modal 사용 예시 */}
				{/* <Button onClick={openModal} content={'승인하기'} />
				<Modal isOpen={isModalOpen} closeModal={closeModal} title={'유니버스 생성완료!'}> */}
				{/* 내용과 버튼은 매번 만들기 */}
				{/* <p style={{ color: 'rgba(0, 0, 0, 0.60)' }}>유니버스가 제대로 생성되었어요!</p>
					<p style={{ color: 'rgba(0, 0, 0, 0.60)' }}>모임정보를 꼭 기억해주세요!</p> */}
				{/* 버튼 1개일 때, 해당 내용 복붙 */}
				{/* <Button type={'floating'} content={'확인'} onClick={closeModal} /> */}
				{/* 버튼 2개일 때, 해당 내용 복붙후 content만 수정 */}
				{/* <div className="modal-btn-group">
						<Button content={'수정하기'} type={'modal-btn other-color'} />
						<Button content={'삭제하기'} type={'modal-btn'} />
					</div>
				</Modal> */}
			</div>
			<NavBar present={'home'} />
		</div>
	);
}
