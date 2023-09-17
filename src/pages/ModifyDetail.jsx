import './CreateDetail.scss';
import Button from '../components/Button';
import { SubHeader } from '../components/Header';
import NavBar from '../components/NavBar';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function ModifyDetail() {
	const [getPost, setGetPost] = useState([]);
	const [getImage, setGetImage] = useState([]);
	const [getParticipant, setGetParticipant] = useState([]);
	const imgUrlList = [];

	const navigate = useNavigate();

	for (let i = 0; i < getImage.length; i++) {
		imgUrlList.push(getImage[i]['img_url']);
	}

	const [limitGender, setLimitGender] = useState(); // 0 or 1 or 2
	const [location, setLocation] = useState('');
	const [meetingDate, setMeetingDate] = useState('');
	const [meetingTime, setMeetingTime] = useState('');
	const [endDate, setEndDate] = useState('');
	const [endTime, setEndTime] = useState('');
	const [openChat, setOpenChat] = useState('');
	const [openChatMessage, setOpenChatMessage] = useState('');

	const { id } = useParams();

	const handleClickNoGenderInput = () => {
		setLimitGender(0);
	};

	const handleClickMaleInput = () => {
		setLimitGender(1);
	};

	const handleClickFemaleInput = () => {
		setLimitGender(2);
	};

	// const handleMeetingDate = (e) => {
	// 	setMeetingDate(e.target.value);
	// };

	const handleMeetingTime = (e) => {
		setMeetingTime(e.target.value);
	};

	// const handleEndDate = (e) => {
	// 	setEndDate(e.target.value);
	// };

	const handleEndTime = (e) => {
		setEndTime(e.target.value);
	};

	const handleLocation = (e) => {
		setLocation(e.target.value);
	};

	const handleOpenChat = (e) => {
		setOpenChat(e.target.value);
	};

	const jwtToken = sessionStorage.getItem('accessToken');

	useEffect(() => {
		axios({
			headers: {
				'x-access-token': jwtToken,
			},
			method: 'GET',
			url: `https://univeus.site/post/${id}`,
		})
			.then((res) => {
				// console.log('res', res.data.result);
				if (res.data.code === 5000 || res.data.code === 5001) {
					navigate('/');
				} else {
					setGetPost(res.data.result.Post);
					setGetImage(res.data.result.PostImages);
					setGetParticipant(res.data.result.Participant['post_id']);
					setLimitGender(res.data.result.Post['limit_gender']);
					setLocation(res.data.result.Post['location']);
					setOpenChat(res.data.result.Post['openchat']);
					setEndDate(
						res.data.result.Post['end_year'] +
							'-' +
							res.data.result.Post['end_month'] +
							'-' +
							res.data.result.Post['end_date']
					);
					setEndTime(res.data.result.Post['end_time']);
					setMeetingDate(
						res.data.result.Post['meeting_year'] +
							'-' +
							res.data.result.Post['meeting_month'] +
							'-' +
							res.data.result.Post['meeting_date']
					);
					setMeetingTime(res.data.result.Post['meeting_time']);
				}
			})
			.catch(function (error) {
				console.log(error);
			});
	}, []);

	const CreateDetailData = {
		user_id: getPost['user_id'],
		category: getPost['category'],
		limit_people: getPost['limit_people'],
		limit_gender: limitGender,
		location: location,
		meeting_date: meetingDate + ' ' + meetingTime,
		openchat: openChat,
		end_date: endDate + ' ' + endTime,
		title: getPost['title'],
		content: getPost['content'],
		images: imgUrlList,
		invited_userNickNames: getParticipant,
	};
	// console.log(CreateDetailData);

	// localStorage에 저장하기
	const handleClickNextPage = () => {
		axios({
			headers: {
				'x-access-token': jwtToken,
			},
			method: 'post',
			url: 'https://univeus.site/post/validate/chat-link',
			data: {
				openChaturi: openChat,
			},
		}).then((res) => {
			if (res.data.code === 3024) {
				setOpenChatMessage(res.data.message);
			} else {
				localStorage.setItem('modify', JSON.stringify(CreateDetailData));
				navigate(`/modify/intro/${id}`);
			}
		});
	};

	return (
		<div className="create-detail">
			<SubHeader headertext={'유니버스 수정'} />
			<div className="cd-body">
				<div className="cd-page">
					<div className="page-tap">
						<span>1. 상세 정보 입력</span>
						<div className="page-hr"></div>
					</div>
					<div
						className="page-tap"
						onClick={
							meetingDate !== '' &&
							meetingTime !== '' &&
							endDate !== '' &&
							endTime !== '' &&
							location !== '' &&
							openChat !== ''
								? handleClickNextPage
								: () => {}
						}
					>
						<span style={{ color: 'var(--light-gray-color)' }}>2. 소개글 글쓰기</span>
						<div className="page-hr" style={{ backgroundColor: 'var(--light-gray-color)' }}></div>
					</div>
				</div>
				<div className="cd-form">
					{/* <div className="cd-category">카테고리</div> */}
					<div className="cd-person-choice">
						<div className="pc-title">인원선택</div>
						<input
							type="radio"
							name="gender"
							id="nogender"
							onClick={handleClickNoGenderInput}
							{...(limitGender === 0 ? { defaultChecked: true } : {})}
						/>
						<label htmlFor="nogender">성별무관</label>
						<input
							type="radio"
							name="gender"
							id="male"
							onClick={handleClickMaleInput}
							{...(limitGender === 1 ? { defaultChecked: true } : {})}
						/>
						<label htmlFor="male">남자만</label>
						<input
							type="radio"
							name="gender"
							id="female"
							onClick={handleClickFemaleInput}
							{...(limitGender === 2 ? { defaultChecked: true } : {})}
						/>
						<label htmlFor="female">여자만</label>
					</div>
					<div className="cd-meet-date">
						<div className="md-title" style={{ marginTop: '20px' }}>
							모임 날짜
						</div>
						<div className="md-row">
							<label className="md-date-label" htmlFor="md-start-date">
								모임일자
							</label>
							{/* <input
								className="md-date-input"
								type="date"
								id="md-start-date"
								date-placeholder="yyyy/mm/dd"
								required
								onChange={handleMeetingDate}
								value={meetingDate}
							/> */}
							<div className="md-date-input">{meetingDate}</div>
							<label className="md-time-label" htmlFor="md-start-time">
								시간
							</label>
							<input
								className="md-time-input"
								type="time"
								id="md-start-time"
								date-placeholder="00:00"
								required
								onChange={handleMeetingTime}
								value={meetingTime}
							/>
						</div>
						<div className="md-row">
							<label className="md-date-label" htmlFor="md-end-date">
								마감일자
							</label>
							{/* <input
								className="md-date-input"
								type="date"
								id="md-end-date"
								date-placeholder="yyyy/mm/dd"
								required
								onChange={handleEndDate}
								value={endDate}
							/> */}
							<div className="md-date-input">{endDate}</div>
							<label className="md-time-label" htmlFor="md-end-time">
								시간
							</label>
							<input
								className="md-time-input"
								type="time"
								id="md-end-time"
								date-placeholder="00:00"
								required
								onChange={handleEndTime}
								value={endTime}
							/>
						</div>
					</div>
					<div className="cd-meet-location">
						<div className="ml-title">모임위치</div>
						<div className="ml-ex">ex) 이스퀘어 앞, 5강의동 벤치 앞</div>
						<input
							type="text"
							className="ml-input"
							placeholder="모임 할 장소를 정해 주세요"
							maxLength="24"
							onChange={handleLocation}
							value={location}
							required
						/>
					</div>
					<div className="cd-contact">
						<div className="cc-title">연락 수단</div>
						<input
							type="text"
							className="cc-input"
							placeholder="오픈채팅방을 개설한 뒤 링크를 붙여넣어 주세요"
							onChange={handleOpenChat}
							value={openChat}
							required
						/>
						<div className="cc-error-message">{openChatMessage}</div>
					</div>
				</div>
				{meetingDate !== '' &&
				meetingTime !== '' &&
				endDate !== '' &&
				endTime !== '' &&
				location !== '' &&
				openChat !== '' ? (
					<Button type={'floating'} content={'다음'} onClick={handleClickNextPage} />
				) : (
					<Button type={'floating disabled'} content={'미입력 된 항목이 있습니다'} />
				)}
			</div>
			<NavBar />
		</div>
	);
}
