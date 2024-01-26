import './CreatePostLevel2.scss';
import { SubHeader } from '../components/Header';
import NavBar from '../components/NavBar';
import Button from '../components/Button';
import { ReactComponent as Icon } from '../assets/images/exclamation-mark.svg';
import { useState } from 'react';

export default function CreatePostLevel2() {
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
							required
						/>
					</div>
					<div className="cpl-ml-ex">ex) 이스퀘어 앞, 5강의동 벤치 앞</div>
				</div>
				<Button type={'floating'} content={'다음'} />
			</div>
			<NavBar />
		</div>
	);
}
