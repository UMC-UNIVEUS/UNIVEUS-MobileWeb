import './CreatePostLevel1.scss';
import { SubHeader } from '../components/Header';
import NavBar from '../components/NavBar';
import Button from '../components/Button';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CreatePostLevel1() {
	const navigate = useNavigate();
	const [category, setCategory] = useState(''); // string
	const [participate, setParticipate] = useState(''); // 자동승인 or 수동승인
	const [limitGender, setLimitGender] = useState(''); // string
	const [limitPeople, setLimitPeople] = useState(''); // number

	const jwtToken =
		'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEwLCJpYXQiOjE3MDU0NzE2MjMsImV4cCI6MTcxNDExMTYyMywiaXNzIjoidW5pdmV1cyJ9.FZ5uso5nr375V9N9IIT14KiKAW5GjPLZxWiFYsSdoAQ';

	// 뒤로가기 버튼 사용시 입력했던 데이터를 반영하기 위한 코드
	const LocalStorageCreatePost = JSON.parse(localStorage.getItem('createPost'));

	useEffect(() => {
		if (localStorage.getItem('createPost') !== null) {
			setCategory(LocalStorageCreatePost['category']);
			setParticipate(LocalStorageCreatePost['participation_method']);
			setLimitGender(LocalStorageCreatePost['limit_gender']);
			setLimitPeople(LocalStorageCreatePost['limit_people']);
		}
	}, []);

	const CreatePost1 = {
		category: category,
		participation_method: participate,
		limit_gender: limitGender,
		limit_people: limitPeople,
	};

	// localStorage에 저장하기
	const handleClickNextPage = () => {
		localStorage.setItem('createPost', JSON.stringify({ ...LocalStorageCreatePost, ...CreatePost1 }));
		navigate('/create/post-level2');
	};

	return (
		<div className="create-post-level1">
			<SubHeader headertext={'상세정보 입력'} />
			<div className="cpl1-body">
				<div className="cpl-tap">
					<div className="cplt-hr-check"></div>
					<div className="cplt-hr"></div>
					<div className="cplt-hr-text">3단계 중 1단계</div>
				</div>
				<div className="cpl-title">
					<div className="cpl-main">어떤</div>
					<div className="cpl-main">유니버스를 생성하시겠어요?</div>
				</div>
				<div className="cpl1-form">
					<div className="cpl-category">
						{['우주공강', '스펙쌓기', '취미/문화', '습관형성', '맛집탐방', '취업활동', '기타모임'].map((data) => {
							return (
								<Button
									type={category === data ? 'small checked' : 'small'}
									content={data}
									onClick={() => {
										setCategory(data);
									}}
								/>
							);
						})}
					</div>
					<div className="cpl-participation-method">
						<div className="cpl-pm-title">참여방식</div>
						<div className="cpl-pm-group">
							<div className="cpl-pm-btns">
								<Button
									type={participate === '자동승인' ? 'checked' : ''}
									content={'자동승인'}
									onClick={() => {
										setParticipate('자동승인');
									}}
								/>
								<span className="cpl-pm-explanation">참여자가 있을시 무조건 승인이에요</span>
							</div>
							<div className="cpl-pm-btns">
								<Button
									type={participate === '수동승인' ? 'checked' : ''}
									content={'수동승인'}
									onClick={() => {
										setParticipate('수동승인');
									}}
								/>
								<span className="cpl-pm-explanation">참여자가 있다면 승인해야해요</span>
							</div>
						</div>
					</div>
					<div className="cpl-person-choice">
						<div className="cpl-pc-title">모집인원</div>
						<input
							type="radio"
							name="gender"
							id="nogender"
							onClick={() => {
								setLimitGender('all');
							}}
							{...(limitGender === 'all' ? { defaultChecked: true } : {})}
						/>
						<label htmlFor="nogender">성별무관</label>
						<input
							type="radio"
							name="gender"
							id="male"
							onClick={() => {
								setLimitGender('man');
							}}
							{...(limitGender === 'man' ? { defaultChecked: true } : {})}
						/>
						<label htmlFor="male">남자만</label>
						<input
							type="radio"
							name="gender"
							id="female"
							onClick={() => {
								setLimitGender('woman');
							}}
							{...(limitGender === 'woman' ? { defaultChecked: true } : {})}
						/>
						<label htmlFor="female">여자만</label>
					</div>
					<div className="cpl-person-number">
						<div className="cpl-pn-btn-group">
							{[1, 2, 3, 4, 5].map((people) => {
								return (
									<div
										className={limitPeople === people ? 'pn-btn checked' : 'pn-btn'}
										onClick={() => {
											setLimitPeople(people);
										}}
									>
										{people}
									</div>
								);
							})}
						</div>
					</div>
				</div>
				{category !== '' && participate !== '' && limitGender !== '' && limitPeople !== '' ? (
					<Button type={'floating next-btn'} content={'다음'} onClick={handleClickNextPage} />
				) : (
					<Button type={'floating disabled next-btn'} content={'다음'} />
				)}
			</div>
			<NavBar />
		</div>
	);
}
