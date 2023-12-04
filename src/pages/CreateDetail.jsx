import './CreateDetail.scss';
import Button from '../components/Button';
import Minus from '../assets/images/minus_blue.svg';
import Plus from '../assets/images/plus_blue.svg';
import { SubHeader } from '../components/Header';
import NavBar from '../components/NavBar';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function CreateDetail() {
	const [category, setCategory] = useState(0);
	const [limitPeople, setLimitPeople] = useState(4); // 4 or 6
	const [limitGender, setLimitGender] = useState(0); // 0 or 1 or 2
	const [location, setLocation] = useState('');
	// const [meetingDate, setMeetingDate] = useState('');
	const [meetingTime, setMeetingTime] = useState('');
	// const [endDate, setEndDate] = useState('');
	const [endTime, setEndTime] = useState('');
	const [openChat, setOpenChat] = useState('');
	const [openChatMessage, setOpenChatMessage] = useState('');

	const navigate = useNavigate();

	const handleClickNoGenderInput = () => {
		setLimitGender(0);
	};

	const handleClickMaleInput = () => {
		setLimitGender(1);
	};

	const handleClickFemaleInput = () => {
		setLimitGender(2);
	};

	const handleClickPeopleMinus = () => {
		setLimitPeople(4);
	};

	const handleClickPeoplePlus = () => {
		setLimitPeople(6);
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

	const today = new Date();
	// 현재 시간
	const presentHours = today.getHours();
	// 년.월.일.
	// const presentDate = today.toLocaleDateString();
	// 년
	const presentYear = today.getFullYear();
	// 월
	const presentMonth = today.getMonth() + 1;
	//일
	const [presentDay, setpresentDay] = useState(today.getDate());

	useEffect(() => {
		function changeDay() {
			let day = today.getDate();
			new Promise((resolve, reject) => {
				if (presentHours === 22 || presentHours === 23) {
					resolve((day += 1));
				} else {
					resolve(day);
				}
			}).then((result) => {
				setpresentDay(result);
			});
		}
		changeDay();
	}, []);

	const date = presentYear + '-' + presentMonth + '-' + presentDay;

	const jwtToken = sessionStorage.getItem('accessToken');

	const CreateDetailData = {
		category: category,
		limit_people: limitPeople,
		limit_gender: limitGender,
		location: location,
		// meeting_date: meetingDate + ' ' + meetingTime,
		meeting_date: date + ' ' + meetingTime,
		openchat: openChat,
		// end_date: endDate + ' ' + endTime,
		end_date: date + ' ' + endTime,
	};

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
				localStorage.setItem('create', JSON.stringify(CreateDetailData));
				navigate('/create/intro');
			}
		});
	};

	// const localStorageData = JSON.parse(localStorage.getItem('create'));
	// console.log(localStorageData);

	return (
		<div className="create-detail">
			<SubHeader headertext={'유니버스 생성'} />
			<div className="cd-body">
				<div className="cd-page">
					<div className="page-tap">
						<span>1. 상세 정보 입력</span>
						<div className="page-hr"></div>
					</div>
					<div
						className="page-tap"
						onClick={
							// meetingDate !== '' &&
							meetingTime !== '' &&
							// endDate !== '' &&
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
					<div className="cd-category">
						<div className="ca-title">카테고리</div>
						<div className="ca-btns">
							<Button
								type={'small'}
								content={'우주공강'}
								onClick={() => {
									setCategory(0);
								}}
							/>
							<Button
								type={'small'}
								content={'스펙쌓기'}
								onClick={() => {
									setCategory(1);
								}}
							/>
							<Button
								type={'small'}
								content={'취미/문화'}
								onClick={() => {
									setCategory(2);
								}}
							/>
							<Button
								type={'small'}
								content={'습관형성'}
								onClick={() => {
									setCategory(3);
								}}
							/>
							<Button
								type={'small'}
								content={'맛집탐방'}
								onClick={() => {
									setCategory(4);
								}}
							/>
							<Button
								type={'small'}
								content={'취업활동'}
								onClick={() => {
									setCategory(5);
								}}
							/>
							<Button
								type={'small'}
								content={'기타모임'}
								onClick={() => {
									setCategory(6);
								}}
							/>
						</div>
					</div>
					<div className="cd-person-choice">
						<div className="pc-title">모집인원</div>
						<input type="radio" name="gender" id="nogender" onClick={handleClickNoGenderInput} defaultChecked />
						<label htmlFor="nogender">성별무관</label>
						<input type="radio" name="gender" id="male" onClick={handleClickMaleInput} />
						<label htmlFor="male">남자만</label>
						<input type="radio" name="gender" id="female" onClick={handleClickFemaleInput} />
						<label htmlFor="female">여자만</label>
					</div>
					{/* <div
						style={{
							marginTop: '8px',
							fontSize: 'var(--tiny-font)',
							color: 'var(--orange-color)',
							fontWeight: 'var(--semi-bold)',
						}}
					>
						모집하고 싶은 상대방의 성별을 선택하세요!
					</div> */}
					<div className="cd-person-number">
						<div className="pn-btn-group">
							<div
								className="pn-btn"
								onClick={() => {
									setLimitPeople(1);
								}}
							>
								1
							</div>
							<div
								className="pn-btn"
								onClick={() => {
									setLimitPeople(2);
								}}
							>
								2
							</div>
							<div
								className="pn-btn"
								onClick={() => {
									setLimitPeople(3);
								}}
							>
								3
							</div>
							<div
								className="pn-btn"
								onClick={() => {
									setLimitPeople(4);
								}}
							>
								4
							</div>
							<div
								className="pn-btn"
								onClick={() => {
									setLimitPeople(5);
								}}
							>
								5
							</div>
						</div>
					</div>
					{/* <div className="cd-person-number">
						<img className="pn-minus" src={Minus} alt="마이너스 버튼" onClick={handleClickPeopleMinus} />
						<div className="pn-input">{limitPeople}</div>
						<img className="pn-plus" src={Plus} alt="플러스 버튼" onClick={handleClickPeoplePlus} />
					</div> */}
					{/* <div
						style={{
							marginBottom: '10px',
							fontSize: 'var(--tiny-font)',
							color: 'var(--orange-color)',
							fontWeight: 'var(--semi-bold)',
						}}
					>
						2:2는 4명선택, 3:3은 6명을 선택해주세요!
					</div> */}
					<div className="cd-meet-date">
						<div className="md-title">모임 날짜</div>
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
							/> */}
							<div className="md-date-input">{date}</div>
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
							/> */}
							<div className="md-date-input">{date}</div>
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
							required
						/>
						<div className="cc-error-message">{openChatMessage}</div>
					</div>
				</div>
				<div className="next-btn">
					{
						// meetingDate !== '' &&
						meetingTime !== '' &&
						// endDate !== '' &&
						endTime !== '' &&
						location !== '' &&
						openChat !== '' ? (
							<Button type={'floating'} content={'다음'} onClick={handleClickNextPage} />
						) : (
							<Button type={'floating disabled'} content={'미입력 된 항목이 있습니다'} />
						)
					}
				</div>
			</div>
			<NavBar />
		</div>
	);
}
