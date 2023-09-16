import axios from 'axios';
import Button from '../components/Button';
import { MainHeader } from '../components/Header';
import MeetingCard from '../components/MeetingCard';
import NavBar from '../components/NavBar';
import SlideBanner from '../components/SlideBanner';
import Footer from '../components/Footer';

import '../pages/HomePage.scss';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
	const [meetingList, setMeetingList] = useState([]);
	const [isParticipate, setIsParticipate] = useState(0);

	const jwtToken = sessionStorage.getItem('accessToken');

	const navigate = useNavigate();

	window.addEventListener('popstate', function (event) {
		navigate('/home');
	});

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
				if (response.data.code === 5000 || response.data.code === 5001) {
					navigate('/');
				} else {
					setIsParticipate(response.data.result.isParticipateOtherPost);
					setMeetingList(response.data.result.postPageResult);
				}
			})
			.catch(function (error) {
				console.log(error);
			});
	}, []);

	window.addEventListener('popstate', function (event) {
		navigate('/home');
	});

	return (
		<div className="HomePage">
			<MainHeader />
			<SlideBanner />
			<div className="homepagebody">
				<div className="matesticker">우리의 축제 MATE🔥</div>
				<div className="meetingcardcontainer">
					{meetingList ? meetingList.map((meeting) => <MeetingCard {...meeting} />) : <div>로딩중</div>}
				</div>
				<Footer />
				{isParticipate === 1 ? 
				<Button 
					className="startbutton"
					content={'모임 참여 완료'}
					type={'floating disabled'}
				/> 
				:
				<Button
					className="startbutton"
					content={'유니버스 생성하기'}
					type={'floating'}
					onClick={() => {
						navigate('/create/detail');
					}}
				/>
				}
			</div>
			<NavBar present={'home'} />
		</div>
	);
};

export default HomePage;
