import './CreatePostLevel2.scss';
import { SubHeader } from '../components/Header';
import NavBar from '../components/NavBar';
import Button from '../components/Button';
import { ReactComponent as Icon } from '../assets/images/exclamation-mark.svg';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function ModifyPostLevel2() {
	const navigate = useNavigate();
	const { id } = useParams();
	const [meetingDate, setMeetingDate] = useState('');
	const [meetingTime, setMeetingTime] = useState('');
	const [location, setLocation] = useState('');

	const handleMeetingDate = (e) => {
		setMeetingDate(e.target.value);
	};

	const handleMeetingTime = (e) => {
		setMeetingTime(e.target.value);
	};
	const handleLocation = (e) => {
		setLocation(e.target.value);
	};

	const LocalStorageModifyPost = JSON.parse(localStorage.getItem('modifyPost'));

	useEffect(() => {
		if (Object.keys(LocalStorageModifyPost).length > 4) {
			setMeetingDate(
				LocalStorageModifyPost['meeting_datetime'].substr(0, LocalStorageModifyPost['meeting_datetime'].indexOf(' '))
			);
			setMeetingTime(
				LocalStorageModifyPost['meeting_datetime'].substr(LocalStorageModifyPost['meeting_datetime'].indexOf(' ') + 1)
			);
			setLocation(LocalStorageModifyPost['location']);
		}
	}, []);

	const ModifyPost2 = {
		meeting_datetime: meetingDate + ' ' + meetingTime,
		location: location,
	};

	const handleClickNextPage = () => {
		localStorage.setItem('modifyPost', JSON.stringify({ ...LocalStorageModifyPost, ...ModifyPost2 }));
		navigate(`/modify/post-level3/${id}`);
	};

	return (
		<div className="create-post-level2">
			<SubHeader headertext={'상세정보 입력'} />
			<div className="cpl2-body">
				<div className="cpl-tap">
					<div className="cplt-hr-check"></div>
					<div className="cplt-hr"></div>
					<div className="cplt-hr-text">3단계 중 2단계</div>
				</div>
				<div className="cpl-title">
					<div className="cpl-main">유니버스의</div>
					<div className="cpl-main">모임정보를 작성해주세요 :)</div>
				</div>
				<div className="cpl2-form">
					<div className="cpl-meet-date">
						<div className="cpl-md-row" style={{ marginBottom: '27px' }}>
							<div className="cpl-md-title">모임 날짜</div>
							<input
								className="cpl-md-date-input"
								type="date"
								id="md-start-date"
								date-placeholder="yyyy/mm/dd"
								required
								value={meetingDate}
								onChange={handleMeetingDate}
							/>
						</div>
						<div className="cpl-md-row" style={{ marginBottom: '7px' }}>
							<div className="cpl-md-title">모임 시간</div>
							<input
								className="cpl-md-time-input"
								type="time"
								id="md-start-time"
								date-placeholder="00:00"
								required
								value={meetingTime}
								onChange={handleMeetingTime}
							/>
						</div>
						<div className="cpl-exclamation-text">
							<Icon />
							<div className="cpl-et-text">모임 시간 3시간 전에 자동 마감됩니다.</div>
						</div>
					</div>
					<div className="cpl-meet-location">
						<div className="cpl-ml-title">모임위치</div>
						<input
							type="text"
							className="cpl-ml-input"
							placeholder="모임 할 장소를 정해 주세요"
							maxLength="24"
							onChange={handleLocation}
							value={location}
							required
						/>
					</div>
					<div className="cpl-ml-ex">ex) 이스퀘어 앞, 5강의동 벤치 앞</div>
				</div>
				{meetingDate !== '' && meetingTime !== '' && location !== '' ? (
					<Button type={'floating'} content={'다음'} onClick={handleClickNextPage} />
				) : (
					<Button type={'floating  disabled'} content={'다음'} />
				)}
			</div>
			<NavBar />
		</div>
	);
}
