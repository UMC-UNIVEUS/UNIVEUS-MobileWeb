import axios from 'axios';
import Button from '../components/Button';
import { MainHeader } from '../components/Header';
import MeetingCard from '../components/MeetingCard';
import NavBar from '../components/NavBar';
import SlideBanner from '../components/SlideBanner';

import '../pages/HomePage.scss';
import { useEffect, useState } from 'react';

const HomePage = () => {
	const [meetingList, setMeetingList] = useState([]);

	// const jwtToken = sessionStorage.getItem('accessToken');
	const jwtToken =
		'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRW1haWwiOiJqdW5nd29vMzQ5MEBreW9uZ2dpLmFjLmtyIiwiaWF0IjoxNjkzODE1NTU4LCJleHAiOjE3MDI0NTU1NTgsImlzcyI6InVuaXZldXMifQ.ehV1pXMk7sEF1B5NYKROnMAUMqiM5oG-O3G2O3VP9U8';

	useEffect(() => {
		axios({
			headers: {
				'x-access-token': jwtToken,
			},
			method: 'get',
			url: 'https://univeus.site',
		})
			.then((response) => {
				setMeetingList(response.data.result.postPageResult);
			})
			.catch(function (error) {
				console.log(error);
			});
	}, []);

	return (
		<div className="HomePage">
			<MainHeader />
			<SlideBanner />
			<div className="homepagebody">
				<div className="matesticker">우리의 축제 MATE🔥</div>
				<div className="meetingcardcontainer">
					{meetingList.map((meeting) => (
						<MeetingCard {...meeting} />
					))}
				</div>
				<Button className="startbutton" content={'유니버스 생성하기'} type={'floating'} />
			</div>
			<NavBar />
		</div>
	);
};

export default HomePage;
