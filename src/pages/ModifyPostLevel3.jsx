import './CreatePostLevel3.scss';
import { SubHeader } from '../components/Header';
import NavBar from '../components/NavBar';
import Button from '../components/Button';
import Modal from '../components/Modal';
import DeleteBtn from '../assets/images/delete.svg';
import InputImg from '../assets/images/input-img.svg';
import { useState, useRef, useEffect } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

export default function ModifyPostLevel3() {
	const MAXSIZE = 1 * 1024 * 1024;
	const imgRef = useRef();
	const navigate = useNavigate();
	const { id } = useParams();

	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');
	const [imgFile, setImgFile] = useState([]);
	const [errorImg, setErrorImg] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const openModal = () => {
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
		localStorage.removeItem('modifyPost');
		navigate(`/post/${id}`);
	};

	const openErrorModal = () => {
		setErrorImg(true);
	};

	const closeErrorModal = () => {
		setErrorImg(false);
	};

	const handleTitle = (e) => {
		setTitle(e.target.value);
	};

	const handleContent = (e) => {
		setContent(e.target.value);
	};

	const jwtToken =
		'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEwLCJpYXQiOjE3MDU0NzE2MjMsImV4cCI6MTcxNDExMTYyMywiaXNzIjoidW5pdmV1cyJ9.FZ5uso5nr375V9N9IIT14KiKAW5GjPLZxWiFYsSdoAQ';

	const LocalStorageModifyPost = JSON.parse(localStorage.getItem('modifyPost'));

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
				url: '/post/image/upload?directory=post',
				data: formData,
			})
				.then((res) => {
					const updatedImgFile = [...imgFile, res.data.result[0]['pic_url']];
					setImgFile(updatedImgFile);
					localStorage.setItem('modifyPost', JSON.stringify({ ...LocalStorageModifyPost, images: updatedImgFile }));
				})
				.catch((err) => {
					console.log('err : ', err);
				});
		}
	};

	useEffect(() => {
		if (Object.keys(LocalStorageModifyPost).length > 6) {
			setTitle(LocalStorageModifyPost['title']);
			setContent(LocalStorageModifyPost['contents']);
			setImgFile(LocalStorageModifyPost['images']);
		}
	}, []);

	const handleFocus = (e) => {
		localStorage.setItem('modifyPost', JSON.stringify({ ...LocalStorageModifyPost, ...ModifyPost3 }));
	};

	useEffect(() => {
		localStorage.setItem('modifyPost', JSON.stringify({ ...LocalStorageModifyPost, images: imgFile }));
	}, [imgFile]);

	const ModifyPost3 = {
		title: title,
		contents: content,
		images: imgFile,
	};

	const handlePosting = () => {
		localStorage.setItem('modifyPost', JSON.stringify({ ...LocalStorageModifyPost, ...ModifyPost3 }));
		axios({
			headers: {
				'x-access-token': jwtToken,
			},
			method: 'patch',
			url: `/post/${id}`,
			data: {
				category: LocalStorageModifyPost['category'],
				limit_gender: LocalStorageModifyPost['limit_gender'],
				limit_people: LocalStorageModifyPost['limit_people'],
				participation_method: LocalStorageModifyPost['participation_method'],
				meeting_datetime: LocalStorageModifyPost['meeting_datetime'],
				location: LocalStorageModifyPost['location'],
				title: LocalStorageModifyPost['title'],
				contents: LocalStorageModifyPost['contents'],
				images: LocalStorageModifyPost['images'],
			},
		}).then((res) => {
			if (res.data.code === 'COMMON200') {
				openModal();
			}
		});
	};

	return (
		<div className="create-post-level3">
			{/* 모두 입력되면 완료 버튼 활성화 */}
			{title !== '' && content !== '' ? (
				<SubHeader headertext={'소개글 쓰기'} textBtn={'완료'} onClick={handlePosting} />
			) : (
				<SubHeader headertext={'소개글 쓰기'} textBtn={'완료'} />
			)}
			<div className="cpl3-body">
				<div className="cpl-tap">
					<div className="cplt-hr-check"></div>
					<div className="cplt-hr"></div>
					<div className="cplt-hr-text">마지막이에요!</div>
				</div>
				<div className="cpl3-form">
					<div className="cpl3-title-group">
						<div className="cpl3t-title">제목</div>
						<input
							type="text"
							className="cpl3t-input"
							maxLength="48"
							placeholder="센스있는 제목으로 이목을 끌어보아요 :)"
							required
							onChange={handleTitle}
							value={title}
							onBlur={handleFocus}
						/>
					</div>
					<div className="cpl3-img-upload">
						<label htmlFor="cpl3-input-img">
							<div className="cpl3-label-text">사진 추가하기</div>
							<img src={InputImg} alt="사진 추가하기" className="cpl3-label-img" />
						</label>
						<input
							type="file"
							accept="image/*"
							id="cpl3-input-img"
							onChange={saveImgFile}
							ref={imgRef}
							style={{ display: 'none' }}
						/>
					</div>
					<div className="cpl3-content">
						<div className="cpl3c-title">내용</div>
						<TextareaAutosize
							className="cpl3c-textarea"
							maxLength="500"
							required
							minRows={9}
							placeholder="어떤 모임을 진행할 예정인가요? 간단하게 작성해 보아요 :) &#13;&#10; &#13;&#10;
              EX)&#13;&#10;
              - 모임 주제 (바른 프로젝트 팀원을 구합니다.)&#13;&#10;
              - 원하는 분위기나, 성격&#13;&#10;
              - 원하는 과, 단과대&#13;&#10;
              - 자신의 경험 사항(프로젝트, 공모전, 대외활동 등)&#13;&#10;
              - 모임의 목표&#13;&#10;"
							onChange={handleContent}
							value={content}
							onBlur={handleFocus}
						/>
					</div>
					<div className="cpl3-img-group">
						{imgFile.map((img, idx) => {
							return (
								<div className="cpl3-img">
									<img
										className="cpl3-img-delete"
										src={DeleteBtn}
										alt="이미지 삭제 버튼"
										onClick={() => {
											const updatedImgFile = imgFile.filter((file) => file !== img);
											setImgFile(updatedImgFile);
											localStorage.setItem(
												'modifyPost',
												JSON.stringify({ ...LocalStorageModifyPost, images: updatedImgFile })
											);
										}}
									/>
									<img className="cpl3-img-box" src={img} alt={`이미지${idx}`} />
								</div>
							);
						})}
					</div>
				</div>
			</div>
			<NavBar />
			<Modal isOpen={isModalOpen} closeModal={closeModal} title={'유니버스 수정완료!'}>
				<p style={{ color: 'rgba(0, 0, 0, 0.60)' }}>유니버스가 수정되었어요!</p>
				<Button type={'floating'} content={'확인'} onClick={closeModal} />
			</Modal>
			<Modal isOpen={errorImg} closeModal={closeErrorModal} title={'이미지 업로드 실패!'}>
				<p style={{ color: 'rgba(0, 0, 0, 0.60)' }}>업로드가 불가능한 이미지입니다.</p>
				<p style={{ color: 'rgba(0, 0, 0, 0.60)' }}>다른 이미지를 선택해주세요!</p>
				<p style={{ color: 'rgba(241, 52, 52, 0.935)' }}>업로드 불가 사유: 업로드 불가 확장자 혹은 용량</p>
				<Button type={'floating'} content={'확인'} onClick={closeErrorModal} />
			</Modal>
		</div>
	);
}
