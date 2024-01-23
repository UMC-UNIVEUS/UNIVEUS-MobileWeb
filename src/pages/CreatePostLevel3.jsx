import './CreatePostLevel3.scss';
import { SubHeader } from '../components/Header';
import NavBar from '../components/NavBar';
import Button from '../components/Button';
import DeleteBtn from '../assets/images/delete.svg';
import InputImg from '../assets/images/input-img.svg';
import { useState, useRef } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { useNavigate } from 'react-router-dom';

export default function CreatePostLevel3() {
	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');
	const [img, setImg] = useState([]);

	const imgRef = useRef();
	const navigate = useNavigate();

	const handleTitle = (e) => {
		setTitle(e.target.value);
	};

	const handleContent = (e) => {
		setContent(e.target.value);
	};

	// API 통신후 수정
	const saveImgFile = () => {
		const file = imgRef.current.files[0];
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onloadend = () => {
			// setImg(...reader.result);
			setImg({ ...[reader.result] });
		};
	};

	return (
		<div className="create-post-level3">
			{/* 모두 입력되면 완료 버튼 활성화 */}
			<SubHeader headertext={'소개글 쓰기'} textBtn={'완료'} />
			{/* <SubHeader
				headertext={'소개글 쓰기'}
				textBtn={'완료'}
				onClick={() => {
					navigate('/');
				}}
			/> */}
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
						/>
						<div className="cpl3u-img-group">{/* 이미지 넣는 박스 */}</div>
					</div>
					<div className="cpl3-img-group">
						<div className="cpl3-img">
							<img
								className="cpl3-img-delete"
								src={DeleteBtn}
								alt="이미지 삭제 버튼"
								onClick={() => {
									setImg('');
								}}
							/>
							<img
								className="cpl3-img-box"
								src="https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/201901/20/28017477-0365-4a43-b546-008b603da621.jpg"
								alt=""
							/>
						</div>
						<div className="cpl3-img">
							<img
								className="cpl3-img-delete"
								src={DeleteBtn}
								alt="이미지 삭제 버튼"
								onClick={() => {
									setImg('');
								}}
							/>
							<img
								className="cpl3-img-box"
								src="https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/201901/20/28017477-0365-4a43-b546-008b603da621.jpg"
								alt=""
							/>
						</div>
						<div className="cpl3-img">
							<img
								className="cpl3-img-delete"
								src={DeleteBtn}
								alt="이미지 삭제 버튼"
								onClick={() => {
									setImg('');
								}}
							/>
							<img
								className="cpl3-img-box"
								src="https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/201901/20/28017477-0365-4a43-b546-008b603da621.jpg"
								alt=""
							/>
						</div>
					</div>
				</div>
			</div>
			<NavBar />
		</div>
	);
}
