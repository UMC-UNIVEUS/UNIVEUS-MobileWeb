import './CreatePostLevel3.scss';
import { SubHeader } from '../components/Header';
import NavBar from '../components/NavBar';
import Button from '../components/Button';
import Modal from '../components/Modal';
import DeleteBtn from '../assets/images/delete.svg';
import InputImg from '../assets/images/input-img.svg';
import { useState, useRef, useEffect } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function CreatePostLevel3() {
	const MAXSIZE = 1 * 1024 * 1024;
	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');
	const [imgFile, setImgFile] = useState([]);
	const [postId, setPostId] = useState();
	const [errorImg, setErrorImg] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const imgRef = useRef();
	const navigate = useNavigate();

	const openModal = () => {
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
		localStorage.removeItem('createPost');
		navigate(`/post/${postId}`);
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

	const LocalStorageCreatePost = JSON.parse(localStorage.getItem('createPost'));

	// 이미지 업로드 input의 onChange
	const saveImgFile = (e) => {
		const file = imgRef.current.files[0];

		e.preventDefault();
		//FormData 객체선언
		const formData = new FormData();

		//File 추가
		//객체를 Json타입으로 파싱하여 Blob객체 생성, type에 json 타입 지정
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
					localStorage.setItem('createPost', JSON.stringify({ ...LocalStorageCreatePost, images: updatedImgFile }));
				})
				.catch((err) => {
					console.log('err : ', err);
				});
		}
	};

	useEffect(() => {
		if (Object.keys(LocalStorageCreatePost).length > 6) {
			setTitle(LocalStorageCreatePost['title']);
			setContent(LocalStorageCreatePost['contents']);
			setImgFile(LocalStorageCreatePost['images']);
		}
	}, []);

	// 글 작성을 마칠때마다 localStorage에 저장
	const handleFocus = (e) => {
		localStorage.setItem('createPost', JSON.stringify({ ...LocalStorageCreatePost, ...CreatePost3 }));
	};

	// 이미지배열 내용이 변경될때마다 localStorage에 저장
	useEffect(() => {
		localStorage.setItem('createPost', JSON.stringify({ ...LocalStorageCreatePost, images: imgFile }));
	}, [imgFile]);

	const CreatePost3 = {
		title: title,
		contents: content,
		images: imgFile,
	};

	const handlePosting = () => {
		localStorage.setItem('createPost', JSON.stringify({ ...LocalStorageCreatePost, ...CreatePost3 }));
		axios({
			headers: {
				'x-access-token': jwtToken,
			},
			method: 'post',
			url: '/post',
			data: {
				category: LocalStorageCreatePost['category'],
				limit_gender: LocalStorageCreatePost['limit_gender'],
				limit_people: LocalStorageCreatePost['limit_people'],
				participation_method: LocalStorageCreatePost['participation_method'],
				meeting_datetime: LocalStorageCreatePost['meeting_datetime'],
				location: LocalStorageCreatePost['location'],
				title: LocalStorageCreatePost['title'],
				contents: LocalStorageCreatePost['contents'],
				images: LocalStorageCreatePost['images'],
			},
		}).then((res) => {
			if (res.data.code === 'COMMON200') {
				setPostId(res.data.result['생성된 post_id']);
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
						{imgFile.map((img) => {
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
												'createPost',
												JSON.stringify({ ...LocalStorageCreatePost, images: updatedImgFile })
											);
										}}
									/>
									<img className="cpl3-img-box" src={img} alt={`이미지${img.indexOf(img) + 1}`} />
								</div>
							);
						})}
					</div>
				</div>
			</div>
			<NavBar />
			<Modal isOpen={isModalOpen} closeModal={closeModal} title={'유니버스 생성완료!'}>
				<p style={{ color: 'rgba(0, 0, 0, 0.60)' }}>유니버스가 제대로 생성되었어요!</p>
				<p style={{ color: 'rgba(0, 0, 0, 0.60)' }}>모임정보를 꼭 기억해주세요!</p>
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
