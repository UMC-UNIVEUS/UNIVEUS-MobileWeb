import './CreateIntro.scss';
import Button from '../components/Button';
import { SubHeader } from '../components/Header';
import NavBar from '../components/NavBar';
import axios from 'axios';
import { useState } from 'react';
import ImageBox from '../components/ImageBox';
import { useNavigate, useParams } from 'react-router-dom';

export default function CreateIntro() {
	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');
	const [invitee, setInvitee] = useState([]);
	const [inviteeText, setInviteeText] = useState('');
	const [image, setImage] = useState([]);
	const [errorMessage, setErrorMessage] = useState('');
	const navigate = useNavigate();
	const { id } = useParams();

	const getImage = (img) => {
		setImage({ ...image, [Object.keys(JSON.parse(img))[0]]: Object.values(JSON.parse(img))[0] });
	};

	const handleTitle = (e) => {
		setTitle(e.target.value);
	};

	const handleContent = (e) => {
		setContent(e.target.value);
	};

	const handleInvitee = (e) => {
		if (inviteeText !== '') {
			setInvitee({ ...invitee, [e.target.id]: inviteeText });
		}
	};

	const handleInviteeText = (e) => {
		setInviteeText(e.target.value);
	};

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

	function repeatImageBox(repeatNum) {
		let arr = [];
		for (let i = 1; i < repeatNum + 1; i++) {
			arr.push(<ImageBox key={i} numbering={i} getImage={getImage} />);
		}
		return arr;
	}

	const jwtToken = sessionStorage.getItem('accessToken');

	const createDetailData = JSON.parse(localStorage.getItem('create'));

	const handlePosting = () => {
		axios({
			headers: {
				'x-access-token': jwtToken,
			},
			method: 'post',
			url: 'https://univeus.site/post',
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
				images: Object.values(image),
				invited_userNickNames: Object.values(invitee),
			},
		}).then((res) => {
			console.log(res);
			if (res.data.code === 5000 || res.data.code === 5001) {
				navigate('/');
			} else if (res.data.message !== '성공') {
				setErrorMessage(res.data.message);
			} else if (res.data.code === 1000) {
				setErrorMessage('');
				localStorage.clear();
				navigate(`/post/${id}`);
			}
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
					<div className="ciu-img-group">
						{/* 이미지 넣는 박스 */}
						{repeatImageBox(4)}
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
					<div className="cfi-error-message">{errorMessage}</div>
					{/* limitPeople의 갯수만큼 추가하기 */}
					{repeatInvitee(createDetailData['limit_people'])}
				</div>
				{/* {title !== '' &&
				content !== '' &&
				Object.values(invitee).filter((item) => item !== '').length === createDetailData['limit_people'] / 2 - 1 ? (
					<Button type={'floating'} content={'유니버스 생성하기'} onClick={handlePosting} />
				) : (
					<Button type={'floating disabled'} content={'미입력 된 항목이 있습니다'} />
				)} */}
				{title !== '' &&
				content !== '' &&
				Object.values(invitee).length === createDetailData['limit_people'] / 2 - 1 ? (
					<Button type={'floating'} content={'유니버스 생성하기'} onClick={handlePosting} />
				) : (
					<Button type={'floating disabled'} content={'미입력 된 항목이 있습니다'} />
				)}
			</div>
			<NavBar />
		</div>
	);
}
