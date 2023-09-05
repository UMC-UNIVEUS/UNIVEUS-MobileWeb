import './MyFeed.scss';
import Button from '../components/Button';
import MeetingCard from '../components/MeetingCard';
import { MainHeader } from '../components/Header';
import NavBar from '../components/NavBar';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function MyFeed() {
	const [meetingList, setMeetingList] = useState([]);

	const jwtToken =
		'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRW1haWwiOiJqdW5nd29vMzQ5MEBreW9uZ2dpLmFjLmtyIiwiaWF0IjoxNjkzODE1NTU4LCJleHAiOjE3MDI0NTU1NTgsImlzcyI6InVuaXZldXMifQ.ehV1pXMk7sEF1B5NYKROnMAUMqiM5oG-O3G2O3VP9U8';

	useEffect(() => {
		axios({
			headers: {
				'x-access-token': jwtToken,
			},
			method: 'get',
			url: 'https://univeus.site/mypage/profile/participate',
		})
			.then((response) => {
				setMeetingList(response.data.result);
			})
			.catch(function (error) {
				console.log(error);
			});
	}, []);
	return (
		<div className="my-feed">
			<MainHeader />
			<div className="mf-body">
				<div className="mf-user">
					<img
						className="mu-user-img"
						src="https://cdn.imweb.me/upload/S202201192ffaf69c61ff8/57ff9f8e31600.jpg"
						alt="유저 프로필 이미지"
					/>
					<div className="mu-text">
						<div className="mu-name">유니버스</div>
						<div className="mu-classof">19학번</div>
					</div>
				</div>
				<div className="mf-page">
					<div className="page-tap">
						<span style={{ color: 'var(--light-gray-color)' }}>1. 상세 정보 입력</span>
						<div className="page-hr" style={{ backgroundColor: 'var(--light-gray-color)' }}></div>
					</div>
					<div className="page-tap">
						<span>2. 소개글 글쓰기</span>
						<div className="page-hr"></div>
					</div>
				</div>
				<div className="mf-card-list">
					{meetingList.map((meeting) => (
						<MeetingCard {...meeting} />
					))}
				</div>
			</div>
			<NavBar />
		</div>
	);
}
