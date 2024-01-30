import './CreatePostLevel1.scss';
import { SubHeader } from '../components/Header';
import NavBar from '../components/NavBar';
import Button from '../components/Button';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

export default function ModifyPostLevel1() {
	const navigate = useNavigate();
	const { id } = useParams();
	const [category, setCategory] = useState(''); // string
	const [participate, setParticipate] = useState(''); // 자동승인 or 수동승인
	const [limitGender, setLimitGender] = useState(''); // string
	const [limitPeople, setLimitPeople] = useState(''); // number

	const jwtToken =
		'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEwLCJpYXQiOjE3MDU0NzE2MjMsImV4cCI6MTcxNDExMTYyMywiaXNzIjoidW5pdmV1cyJ9.FZ5uso5nr375V9N9IIT14KiKAW5GjPLZxWiFYsSdoAQ';

	useEffect(() => {
		axios({
			headers: {
				'x-access-token': jwtToken,
			},
			method: 'get',
			url: `/post/${id}`,
		}).then((res) => {
			console.log(res);
			if (res.data.code === 'COMMON200') {
				const resData = res.data.result.Post;

				// 추가: null 체크 -> 수정 페이지 첫 접근시 Uncaught TypeError 해결
				if (!resData || !res.data.result.PostImages) {
					console.error('서버 응답에 필요한 데이터가 없습니다.');
					return;
				}

				const imgUrlList = [];
				for (let i = 0; i < res.data.result.PostImages.length; i++) {
					imgUrlList.push(res.data.result.PostImages[i]['image_url']);
				}
				const GetData = {
					category: resData['category'],
					limit_gender: resData['limit_gender'],
					limit_people: resData['limit_people'],
					participation_method: resData['participation_method'],
					meeting_datetime:
						resData['meeting_datetime'].substr(0, resData['meeting_datetime'].indexOf('T')) +
						' ' +
						resData['meeting_datetime'].substr(resData['meeting_datetime'].indexOf('T') + 1, 5),
					location: resData['location'],
					title: resData['title'],
					contents: resData['contents'],
					images: imgUrlList,
				};

				localStorage.setItem('modifyPost', JSON.stringify(GetData));
			}
		});
	}, []);

	const LocalStorageModifyPost = JSON.parse(localStorage.getItem('modifyPost'));

	useEffect(() => {
		if (localStorage.getItem('modifyPost') !== undefined) {
			setCategory(LocalStorageModifyPost['category']);
			setParticipate(LocalStorageModifyPost['participation_method']);
			setLimitGender(LocalStorageModifyPost['limit_gender']);
			setLimitPeople(LocalStorageModifyPost['limit_people']);
		}
	}, []);

	const ModifyPost1 = {
		category: category,
		participation_method: participate,
		limit_gender: limitGender,
		limit_people: limitPeople,
	};

	// localStorage에 저장하기
	const handleClickNextPage = () => {
		localStorage.setItem('modifyPost', JSON.stringify({ ...LocalStorageModifyPost, ...ModifyPost1 }));
		navigate(`/modify/post-level2/${id}`);
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
								setLimitGender('ALL');
							}}
							{...(limitGender === 'ALL' ? { defaultChecked: true } : {})}
						/>
						<label htmlFor="nogender">성별무관</label>
						<input
							type="radio"
							name="gender"
							id="male"
							onClick={() => {
								setLimitGender('MAN');
							}}
							{...(limitGender === 'MAN' ? { defaultChecked: true } : {})}
						/>
						<label htmlFor="male">남자만</label>
						<input
							type="radio"
							name="gender"
							id="female"
							onClick={() => {
								setLimitGender('WOMAN');
							}}
							{...(limitGender === 'WOMAN' ? { defaultChecked: true } : {})}
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
