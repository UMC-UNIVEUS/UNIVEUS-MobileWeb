import './MyFeed.scss';
import Button from '../components/Button';
import MeetingCard from '../components/MeetingCard';
import { MainHeader } from '../components/Header';
import NavBar from '../components/NavBar';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function MyFeed() {
	const [meetingList, setMeetingList] = useState([]);
	const [userInfo, setUserInfo] = useState([]);
	const [clicked, setClicked] = useState('create');
	const navigate = useNavigate();

	const jwtToken = sessionStorage.getItem('accessToken');

	// 최초 렌더링시 실행
	useEffect(() => {
		axios({
			headers: {
				'x-access-token': jwtToken,
			},
			method: 'GET',
			url: 'https://univeus.site/profile/myunive',
		})
			.then((response) => {
				if (response.data.result.code === 5000 || response.data.result.code === 5001) {
					navigate('/');
				} else {
					setMeetingList(response.data.result);
					setClicked('create');
				}
			})
			.catch(function (error) {
				console.log(error);
			});
	}, []);

	useEffect(() => {
		axios({
			headers: {
				'x-access-token': jwtToken,
			},
			method: 'GET',
			url: 'https://univeus.site/profile',
		})
			.then((response) => {
				if (response.data.result.code === 5000 || response.data.result.code === 5001) {
					navigate('/');
				} else {
					setUserInfo(response.data.result);
				}
			})
			.catch(function (error) {
				console.log(error);
			});
	}, []);

	// 클릭할 때 마다 실행
	const handleMyUniv = () => {
		axios({
			headers: {
				'x-access-token': jwtToken,
			},
			method: 'GET',
			url: 'https://univeus.site/profile/myunive',
		})
			.then((response) => {
				if (response.data.result.code === 5000 || response.data.result.code === 5001) {
					navigate('/');
				} else {
					setMeetingList(response.data.result);
					setClicked('create');
				}
			})
			.catch(function (error) {
				console.log(error);
			});
	};

	const handleParticipate = () => {
		axios({
			headers: {
				'x-access-token': jwtToken,
			},
			method: 'GET',
			url: 'https://univeus.site/profile/participate',
		})
			.then((response) => {
				if (response.data.result.code === 5000 || response.data.result.code === 5001) {
					navigate('/');
				} else {
					setMeetingList(response.data.result);
					setClicked('participate');
				}
			})
			.catch(function (error) {
				console.log(error);
			});
	};
	return (
		<div className="my-feed">
			<MainHeader />
			<div className="mf-body">
				<div className="mf-user">
					<img
						className="mu-user-img"
						src={userInfo['profile_img']}
						alt="유저 프로필 이미지"
						style={{ borderColor: userInfo['gender'] === 1 ? 'var(--purple-color)' : 'var(--red-color)' }}
					/>
					<div className="mu-text">
						<div className="mu-name">{userInfo['nickname']}</div>
						<div className="mu-classof">{userInfo['class_of']}</div>
					</div>
				</div>
				<div className="mf-page">
					<div className={clicked === 'create' ? 'page-tap clicked' : 'page-tap'} onClick={handleMyUniv}>
						<span>생성 유니버스</span>
						<div className="page-hr"></div>
					</div>
					<div className={clicked === 'participate' ? 'page-tap clicked' : 'page-tap'} onClick={handleParticipate}>
						<span>참여 유니버스</span>
						<div className="page-hr"></div>
					</div>
				</div>
				<div className="mf-card-list">
					{meetingList.length && meetingList.map((meeting) => <MeetingCard {...meeting} />)}
				</div>
			</div>
			<NavBar />
		</div>
	);
}
