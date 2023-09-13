import './CreateIntro.scss';
import Button from '../components/Button';
import { SubHeader } from '../components/Header';
import NavBar from '../components/NavBar';
import DeleteBtn from '../assets/images/delete.svg';
import PlusBtn from '../assets/images/plus.svg';
import axios from 'axios';
import { useState, useSelector, useRef } from 'react';

export default function CreateIntro() {
	const [imgFile, setImgFile] = useState('');
	const imgRef = useRef();

	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');
	const [invitee, setInvitee] = useState([]);
	const [inviteeText, setInviteeText] = useState('');

	const handleTitle = (e) => {
		setTitle(e.target.value);
	};

	const handleContent = (e) => {
		setContent(e.target.value);
	};

	const handleInvitee = (e) => {
		setInvitee({ ...invitee, [e.target.id]: inviteeText });
	};

	const handleInviteeText = (e) => {
		setInviteeText(e.target.value);
	};
	// console.log(Object.values(invitee));
	console.log(invitee);

	function repeatInvitee(limit_people) {
		let arr = [];
		for (let i = 0; i < limit_people / 2 - 1; i++) {
			arr.push(
				<input
					type="text"
					className="cfi-input"
					id={i}
					placeholder="친구의 닉네임을 입력해주세요"
					required
					onChange={handleInviteeText}
					onBlur={handleInvitee}
					key={i}
				/>
			);
		}
		return arr;
	}

	const jwtToken = sessionStorage.getItem('accessToken');
	// 이미지 업로드 input의 onChange
	const saveImgFile = (e) => {
		const file = imgRef.current.files[0];
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onloadend = () => {
			setImgFile(reader.result);
		};
		e.preventDefault();
		//FormData 객체선언
		const formData = new FormData();

		//File 추가
		//객체를 Json타입으로 파싱하여 Blob객체 생성, type에 json 타입 지정
		formData.append('image', file);
		// console.log(formData);
		axios({
			headers: {
				'x-access-token': jwtToken,
				'Content-Type': 'multipart/form-data',
			},
			method: 'post',
			url: 'http://localhost:4000//post/image/upload',
			data: formData,
		}).then((res) => {
			console.log(res);
		});
	};
	const createDetailData = JSON.parse(localStorage.getItem('watched'));
	createDetailData['limit_people'] = 6;
	// console.log((createDetailData['limit_people'] = 6));

	// const jwtToken = useSelector((state) => state.jwtToken);

	const handlePosting = () => {
		axios({
			// headers: {
			// 	'x-access-token': jwtToken,
			// },
			method: 'post',
			url: 'http://localhost:4000/post',
			data: {
				category: createDetailData['category'],
				limit_people: createDetailData['limit_people'],
				limit_gender: createDetailData['limit_gender'],
				location: createDetailData['location'],
				meeting_date: createDetailData['meeting_date'],
				openchat: createDetailData['openchat'],
				end_date: createDetailData['end_date'],
				title: title,
				content: content,
				participant_userNickNames: Object.values(invitee),
			},
		}).then((res) => {
			console.log(res);
			// console.log(jwtToken);
		});
	};
	return (
		<div className="create-intro">
			<SubHeader headertext={'유니버스 생성'} />
			<div className="ci-body">
				<div className="ci-page">
					<div className="page-tap">
						<span style={{ color: 'var(--light-gray-color)' }}>1. 상세 정보 입력</span>
						<div className="page-hr" style={{ backgroundColor: 'var(--light-gray-color)' }}></div>
					</div>
					<div className="page-tap">
						<span>2. 소개글 글쓰기</span>
						<div className="page-hr"></div>
					</div>
				</div>
				<div className="ci-title">
					<div className="ct-title">제목</div>
					<input
						type="text"
						className="ct-input"
						maxLength="48"
						placeholder="센스있는 제목으로 이목을 끌어보아요 :)"
						required
						onChange={handleTitle}
					/>
				</div>
				<div className="ci-img-upload">
					<div className="ciu-title">이미지</div>
					{/* 이미지들을 배열로 담아서 배열[0], 배열[1] 로 출력하기 */}
					<div className="ciu-img-group">
						{/* 업로드된 이미지가 있는가 ? 업로드된 이미지가 있다면 이미지와 삭제 버튼 추가 : 없다면 삭제버튼 안보이게, 플러스 버튼(디폴트)  */}
						<div className="ciu-img">
							<label htmlFor="ciu-img-upload">
								<img className="ciu-img-file" src={imgFile[0] ? imgFile : PlusBtn} alt="이미지1" />
							</label>
							<input
								type="file"
								accept="image/*"
								id="ciu-img-upload"
								onChange={saveImgFile}
								ref={imgRef}
								style={{ display: 'none' }}
							/>
						</div>
						{/* <div className="ciu-img">
							<label htmlFor="ciu-img-upload">
								<img className="ciu-img-file" src={imgFile ? imgFile : PlusBtn} alt="이미지2" />
							</label>
							<input
								type="file"
								accept="image/*"
								id="ciu-img-upload"
								onChange={saveImgFile}
								ref={imgRef}
								style={{ display: 'none' }}
							/>
						</div>
						<div className="ciu-img">
							<label htmlFor="ciu-img-upload">
								<img className="ciu-img-file" src={imgFile ? imgFile : PlusBtn} alt="이미지3" />
							</label>
							<input
								type="file"
								accept="image/*"
								id="ciu-img-upload"
								onChange={saveImgFile}
								ref={imgRef}
								style={{ display: 'none' }}
							/>
						</div>
						<div className="ciu-img">
							<label htmlFor="ciu-img-upload">
								<img className="ciu-img-file" src={imgFile ? imgFile : PlusBtn} alt="이미지4" />
							</label>
							<input
								type="file"
								accept="image/*"
								id="ciu-img-upload"
								onChange={saveImgFile}
								ref={imgRef}
								style={{ display: 'none' }}
							/>
						</div> */}
					</div>
				</div>
				<div className="ci-content">
					<div className="cct-title">소개글 작성</div>
					<textarea
						className="cct-textarea"
						maxLength="500"
						required
						placeholder="어떤 모임을 진행할 예정인가요? 간단하게 작성해 보아요 :) &#13;&#10; &#13;&#10;
            EX)&#13;&#10;
            - 모임 주제 (바른 프로젝트 팀원을 구합니다.)&#13;&#10;
            - 원하는 분위기나, 성격&#13;&#10;
            - 원하는 과, 단과대&#13;&#10;
            - 자신의 경험 사항(프로젝트, 공모전, 대외활동 등)&#13;&#10;
            - 모임의 목표&#13;&#10;"
						onChange={handleContent}
					></textarea>
				</div>
				<div className="ci-friend-invite">
					<div className="cfi-title">친구 초대</div>
					{/* limitPeople의 갯수만큼 추가하기 */}
					{repeatInvitee(createDetailData['limit_people'])}
					{/* <input
						type="text"
						className="cfi-input"
						placeholder="친구의 닉네임을 입력해주세요"
						required
						onChange={handleInviteeText}
						onBlur={handleInvitee}
					/>
					<input
						type="text"
						className="cfi-input"
						placeholder="친구의 닉네임을 입력해주세요"
						required
						onChange={handleInviteeText}
						onBlur={handleInvitee}
					/> */}
				</div>
				{/* {meetingDate !== '' &&
				meetingTime !== '' &&
				endDate !== '' &&
				endTime !== '' &&
				location !== '' &&
				opendChat !== '' ? (
					<Button type={'floating'} content={'다음'} onClick={handleClickNextPage} />
				) : (
					<Button type={'floating disabled'} content={'미입력 된 항목이 있습니다'} />
				)} */}
			</div>
			<NavBar />
		</div>
	);
}
