import axios from 'axios';
import Button from '../components/Button';
import { MainHeader } from '../components/Header';
import MeetingCard from '../components/MeetingCard';
import NavBar from '../components/NavBar';
import SlideBanner from '../components/SlideBanner';

import '../pages/HomePage.scss';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
	const [meetingList, setMeetingList] = useState([]);

	const jwtToken = sessionStorage.getItem('accessToken');

	const navigate = useNavigate();

	useEffect(() => {
		axios({
			headers: {
				'x-access-token': jwtToken,
			},
			method: 'get',
			url: 'https://univeus.site/',
		})
			.then((response) => {
				console.log(response);
				if (response.data.result.code === 5000 || response.data.result.code === 5001) {
					navigate('/');
				} else {
					setMeetingList(response.data.result.postPageResult);
				}
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
					{meetingList ? meetingList.map((meeting) => (
						<MeetingCard {...meeting} />
					)) : <div>로딩중</div>}
				</div>
				<Button className="startbutton" content={'유니버스 생성하기'} type={'floating'} />
			</div>
			<NavBar />
		</div>
	);
};

export default HomePage;
