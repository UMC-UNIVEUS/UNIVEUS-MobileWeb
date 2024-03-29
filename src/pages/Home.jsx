import './Home.scss';
import { MainHeader } from '../components/Header';
import NavBar from '../components/NavBar';
import SlideBanner from '../components/SlideBanner';
import Card from '../components/Card';
import Profile from '../components/Profile';
import Modal from '../components/Modal';
import Button from '../components/Button';
import Footer from '../components/Footer';
import { ReactComponent as Memebership } from '../assets/images/membership.svg';
import { ReactComponent as People } from '../assets/images/people.svg';
import Logo from '../assets/images/logo3.png';
import School from '../assets/images/school.svg';
import Fire from '../assets/images/fire.svg';
import Flag from '../assets/images/flag.svg';
import Money from '../assets/images/money.svg';

import NeckTie from '../assets/images/necktie.svg';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function Home() {
	const jwtToken = sessionStorage.getItem('accessToken');
	const navigate = useNavigate();
	const [categoryTap, setCategoryTap] = useState('전체보기'); // 전체보기, 우주공강,스펙쌓기,취미문화,맛집탐방,습관형성,취업활동,수업친구
	const [card, setCard] = useState([]);

	// 카테고리에 따른 카드 불러오기
	// 페이징 반영 X
	const postCardGet = async () => {
		const category = categoryTap === '전체보기' ? '전체' : categoryTap;
		const res = await axios.get(`https://univeus.site?category=${category}`, {
			headers: {
				'x-access-token': jwtToken,
			},
		});

		console.log(res);
		setCard(res.data.result);
	};

	useEffect(() => {
		postCardGet();
	}, [categoryTap]);

	return (
		<div className="home">
			<MainHeader />
			<div className="home-body">
				<SlideBanner />
				<div className="hb-tap-box">
					{[
						[Logo, '취뽀컨텐츠'],
						[School, '학교꿀팁'],
						[Fire, '우리의핫플'],
						[Flag, '모임장소'],
						[Money, '정부지원'],
						[NeckTie, '멘토찾기'],
					].map((element) => {
						return (
							<div className="hb-tap" style={{ border: element[0] === Logo ? '1px solid var(--purple-color)' : '' }}>
								<img src={element[0]} alt={`${element[1]} 아이콘`} className="hp-tap-icon" />
								<span className="hb-tap-text" style={{ color: element[0] === Logo ? 'var(--purple-color)' : '' }}>
									{element[1]}
								</span>
							</div>
						);
					})}
				</div>
				<div className="hb-hr"></div>
				<div className="hb-membership-card-list">
					<div className="hb-mcl-title">검증된 멤버의 행성들이에요 🪐</div>
					<div className="hb-mcl-card-box">
						{[
							{
								img: 'https://www.artinsight.co.kr/data/tmp/2205/20220501132227_wuncuztw.jpg',
								category: '스펙쌓기',
								dday: 'D-1',
								people: '2/4',
								title: '저녁 메뉴는 뭘 먹을까',
								name: '소하',
								dapartment: '19학번 / 소프트웨어경영대학',
							},
							{
								img: 'https://www.artinsight.co.kr/data/tmp/2205/20220501132526_ilcmhrww.jpg',
								category: '우주공강',
								dday: 'D-10',
								people: '1/4',
								title: '점메추 받습니다',
								name: '행쨩',
								dapartment: '21학번 / 창의공과대학',
							},
							{
								img: 'https://image.newsis.com/2023/07/12/NISI20230712_0001313626_web.jpg',
								category: '우주공강',
								dday: 'D-10',
								people: '1/4',
								title: '점메추 받습니다',
								name: '행쨩',
								dapartment: '21학번 / 창의공과대학',
							},
						].map((data) => {
							return (
								<div className="hb-memebership-card" onClick={() => {}}>
									<img src={data.img} alt="" className="hb-mc-img" />
									<div className="hb-mc-content">
										<div className="hb-mc-top">
											<div className="hb-mc-tag-group">
												<div className="hb-mc-tag-category">{data.category}</div>
												<div className="hb-mc-tag-dday">{data.dday}</div>
											</div>
											<div className="hb-mc-peopl-group">
												<People className="hb-mc-people-icon" />
												<span className="hb-mc-people">{data.people}</span>
											</div>
										</div>
										<div className="hb-mc-title">{data.title}</div>
										<div className="hb-mc-bottom">
											<Profile />
											<div className="hb-mc-user-info">
												<div className="hb-mc-ui-name-group">
													<span className="hb-mb-ui-name">{data.name}</span>
													<Memebership className="hb-mb-ui-membership" />
												</div>
												<div className="hb-mc-ui-department">{data.dapartment}</div>
											</div>
										</div>
									</div>
								</div>
							);
						})}
					</div>
				</div>
				<div className="hb-hr"></div>
				<div className="hb-main-card-list">
					<div className="hb-mcl-title">어떤 행성을 찾아볼까요?</div>
					<div className="hb-mcl-btn-group">
						{['전체보기', '우주공강', '스펙쌓기', '취미문화'].map((title) => {
							return (
								<div
									className="hb-mcl-btn top"
									style={{
										color: title === categoryTap ? 'var(--white-color)' : '',
										backgroundColor: title === categoryTap ? 'var(--purple-color)' : '',
									}}
									onClick={() => {
										setCategoryTap(title);
									}}
								>
									{title}
								</div>
							);
						})}
					</div>
					<div className="hb-mcl-btn-group">
						{['맛집탐방', '습관형성', '취업활동', '수업친구'].map((title) => {
							return (
								<div
									className="hb-mcl-btn bottom"
									style={{
										color: title === categoryTap ? 'var(--white-color)' : '',
										backgroundColor: title === categoryTap ? 'var(--purple-color)' : '',
									}}
									onClick={() => {
										setCategoryTap(title);
									}}
								>
									{title}
								</div>
							);
						})}
					</div>
					<div className="hb-mcl-card-group">
						{card.length === 0 ? (
							<span className="hb-mcl-card-nothing">일치하는 항목이 없습니다.</span>
						) : (
							card.map((data) => {
								return <Card {...data} />;
							})
						)}
					</div>
				</div>
				<Button
					type={'floating'}
					content={'유니버스 생성하기'}
					onClick={() => {
						navigate('/create/post-level1');
					}}
				/>
				<Footer />
			</div>
			<NavBar present={'home'} />
		</div>
	);
}
