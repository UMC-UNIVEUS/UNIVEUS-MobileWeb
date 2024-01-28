import './UnivePost.scss';
import { MainHeader, SubHeader } from '../components/Header';
import NavBar from '../components/NavBar';
import Profile from '../components/Profile';
import Modal from '../components/Modal';
import Button from '../components/Button';
import { ReactComponent as Memebership } from '../assets/images/membership.svg';
import { ReactComponent as People } from '../assets/images/people.svg';
import { ReactComponent as MaleIcon } from '../assets/images/male.svg';
import { ReactComponent as FemaleIcon } from '../assets/images/female.svg';
import Declaration from '../assets/images/declaration.svg';
import { ReactComponent as Exclamation } from '../assets/images/exclamation-mark.svg';
import Calendar from '../assets/images/calendar-blue.svg';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

export default function UnivePost() {
	const { id } = useParams();
	const [isModalOpenReport, setIsModalOpenReport] = useState(false);
	const [declaration, setDeclaration] = useState();
	const [postData, setPostData] = useState({
		connectedUser: {
			user_id: '',
			status: '',
		},
		Writer: {
			user_id: '',
			gender: '',
			nickname: '',
			student_id: '',
			major: '',
			status: '',
		},
		Post: {
			category: '',
			limit_gender: '',
			current_people: '',
			limit_people: '',
			participation_method: '',
			meeting_datetime: '',
			end_datetime: '',
			location: '',
			title: '',
			contents: '',
			post_status: '',
		},
		PostImages: [],
		ParticipantList: [],
	});

	const openModalReport = () => setIsModalOpenReport(true);
	const closeModalReport = () => {
		setIsModalOpenReport(false);
		setDeclaration();
	};

	const jwtToken =
		'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEwLCJpYXQiOjE3MDU0NzE2MjMsImV4cCI6MTcxNDExMTYyMywiaXNzIjoidW5pdmV1cyJ9.FZ5uso5nr375V9N9IIT14KiKAW5GjPLZxWiFYsSdoAQ';

	useEffect(() => {
		// axios({
		// 	headers: {
		// 		'x-access-token': jwtToken,
		// 	},
		// 	method: 'get',
		// 	url: `/post/${id}`,
		// }).then((res) => {
		// 	if (res.data.code === 'COMMON200') {
		// 		const resData = res.data.result;
		// 		// const GetData = {
		// 		// 	connectedUser: {
		// 		// 		user_id: resData.connectedUser['user_id'],
		// 		// 		status: resData.connectedUser['status'],
		// 		// 	},
		// 		// 	Writer: {
		// 		// 		user_id: resData.Writer['user_id'],
		// 		// 		gender: resData.Writer['gender'],
		// 		// 		nickname: resData.Writer['nickname'],
		// 		// 		student_id: resData.Writer['student_id'],
		// 		// 		major: resData.Writer['major'],
		// 		// 		status: resData.Writer['status'],
		// 		// 	},
		// 		// 	Post: {
		// 		// 		category: resData.Post['category'],
		// 		// 		limit_gender: resData.Post['limit_gender'],
		// 		// 		current_people: resData.Post['current_people'],
		// 		// 		limit_people: resData.Post['limit_people'],
		// 		// 		participation_method: resData.Post['participation_method'],
		// 		// 		meeting_datetime: resData.Post['meeting_datetime'],
		// 		// 		end_datetime: resData.Post['end_datetime'],
		// 		// 		location: resData.Post['location'],
		// 		// 		title: resData.Post['title'],
		// 		// 		contents: resData.Post['contents'],
		// 		// 		post_status: resData.Post['post_status'],
		// 		// 	},
		// 		// 	PostImages: imgUrlList,
		// 		// 	ParticipantList: [
		// 		// 		{
		// 		// 			user_id: resData.ParticipantList['user_id'],
		// 		// 			gender: resData.ParticipantList['gender'],
		// 		// 			nickname: resData.ParticipantList['nickname'],
		// 		// 			student_id: resData.ParticipantList['student_id'],
		// 		// 			major: resData.ParticipantList['major'],
		// 		// 			status: resData.ParticipantList['status'],
		// 		// 		},
		// 		// 	],
		// 		// };
		// 		// setPostData(GetData);
		// 		// console.log(resData);
		// 		setPostData(resData);
		// 		const imgUrlList = [];
		// 		for (let i = 0; i < resData.PostImages.length; i++) {
		// 			imgUrlList.push(resData.PostImages[i]['image_url']);
		// 		}
		// 		setPostData({ ...postData, PostImages: imgUrlList });
		// 	}
		// });
	}, []);

	useEffect(() => {
		const axiosPost = async () => {
			try {
				let res = await axios.get(`/post/${id}`, { headers: { 'x-access-token': jwtToken } });
				const imgUrlList = [];
				for (let i = 0; i < res.data.result.PostImages.length; i++) {
					imgUrlList.push(res.data.result.PostImages[i]['image_url']);
				}
				setPostData(res.data.result);
				setPostData({ ...res.data.result, PostImages: imgUrlList });
			} catch (error) {
				console.log(error);
			}
		};
		axiosPost();
	}, []);

	return (
		<div className="unive-post">
			{/* <h1>{resData.Post.category}</h1> */}
			{/* 본인 포스트인지 여부에 따라 헤더 변경 */}
			{/* <SubHeader headertext={resData.Post['category']} iconBtn={Calendar} onClick={openModal} /> */}
			<SubHeader headertext={postData.Post.category} iconBtn={Declaration} onClick={openModalReport} />
			<div className="up-body">
				<div className="up-top">
					<div className="upt-user-info">
						<Profile />
						<div className="upt-ui-group">
							<div className="upt-name-group">
								{/* <span className="upt-name">{resData.Writer['nickname']}</span> */}
								<Memebership />
							</div>
							<div className="upt-department">{/* {resData.Writer['student_id']} / {resData.Writer['major']} */}</div>
						</div>
					</div>
					<div className="upt-post-info">
						<div className="upt-pi-people-group">
							<People className="upt-pi-people-img" />
							<span className="upt-pi-people">
								{/* {resData.Post['current_people']}/{resData.Post['limit_people']} */}
							</span>
						</div>
						{/* 성별 제한에 따라 색상 및 문구 변경하기 */}
						<div className="upt-pi-gender">
							{/* {resData.Post['limit_gender'] === 'MAN' ? (
								<MaleIcon className="upt-pi-gender-img" />
							) : resData.Post['limit_gender'] === 'WOMAN' ? (
								<FemaleIcon className="upt-pi-gender-img" />
							) : (
								<></>
							)} */}
							<span className="upt-pi-gender-text">ONLY</span>
						</div>
					</div>
				</div>
				<div className="up-meeting-box">
					<div className="up-mb-deadline-group">
						<Exclamation />
						<span className="up-mb-deadline-date">2024년 9월 26일 마감</span>
					</div>
					<div className="up-mb-metting-group">
						<div className="up-mb-title">모임 일시</div>
						<div className="up-mb-data">2024년 09월 27일 / 15:00</div>
					</div>
					<div className="up-mb-metting-group">
						<div className="up-mb-title">모임 장소</div>
						<div className="up-mb-data">5강의동과 이스퀘어 사이 벤치</div>
					</div>
				</div>
				<div className="up-content-box">
					<div className="up-cb-title">오늘 점심은 뭐 먹지?</div>
					<div className="up-cb-textarea">
						여러가지 내용 블라블라 오늘 점심 뭐먹지 배고프다 현재 시각 새별 1시 57분인데요 역시 사람은 좀 부지런해야
						합니다. 근데 졸리지는 않아서 괜찮은 것 같기도?
					</div>
				</div>
				<div className="up-image-box">
					<img
						src="https://www.fitpetmall.com/wp-content/uploads/2023/09/shutterstock_2205178589-1-1.png"
						alt=""
						className="up-img"
					/>
					<img
						src="https://img.freepik.com/free-photo/cute-puppy-sitting-in-grass-enjoying-nature-playful-beauty-generated-by-artificial-intelligence_188544-84973.jpg"
						alt=""
						className="up-img"
					/>
					<img
						src="https://blog.kakaocdn.net/dn/wSyzv/btrr3mQG8O7/2X66MWlWZkyAPMtt2NngL1/img.png"
						alt=""
						className="up-img"
					/>
				</div>
				<div className="up-hr"></div>
				<div className="up-participant-box">
					<div className="up-pb-text">이런 친구들이 함께해요 !</div>
					<div className="up-pb-group">
						<div className="up-pb-bundle">
							<div className="up-pb-user-info">
								<Profile />
								<div className="up-pb-user-name-group">
									<div className="up-pb-name">동동</div>
									<div className="up-pb-department">17학번 / 사회과학대학</div>
								</div>
							</div>
							<div className="up-pb-situation">참여중</div>
						</div>
					</div>
					<div className="up-pb-group">
						{/* 자신의 포스팅일때, 승인하지 않은 참가자 */}
						<div className="up-pb-bundle" style={{ backgroundColor: 'var(--white-gray-color)' }}>
							<div className="up-pb-user-info">
								<Profile />
								<div className="up-pb-user-name-group">
									<div className="up-pb-name">동동</div>
									<div className="up-pb-department">17학번 / 사회과학대학</div>
								</div>
							</div>
							{/* <div className="up-pb-situation">참여중</div> */}
							<div className="up-pb-situation-btn" onClick={() => {}}>
								승인하기
							</div>
						</div>
					</div>
				</div>
				{/* 상태에 따라 버튼 여부와 문구가 변경 */}
				<Button type={'floating'} content={'유니버스 관리하기'} />
			</div>
			<Modal isOpen={isModalOpenReport} closeModal={closeModalReport} title={'게시글을 신고하시겠어요?'}>
				<p style={{ color: 'rgba(0, 0, 0, 0.60)' }}>신고 사유를 선택해 주시면 확인 후 조치가 취해집니다.</p>
				<div className="oup-radio-box">
					{[
						['불건전한 언행을 사용해요.', 1],
						['불건전한 프로필을 게시했어요.', 2],
						['광고, 홍보성 게시글을 게시했어요.', 3],
						['부적절한 이미지를 게시했어요.', 4],
						['기타(확인 후 조치를 취해주세요)', 5],
					].map((message) => {
						return (
							<div className="oup-radio-group">
								<input
									className="oup-radio"
									type="radio"
									name="gender"
									id={message[1]}
									onClick={() => {
										setDeclaration(message[1]);
									}}
								/>
								<label htmlFor={message[1]}>{message[0]}</label>
							</div>
						);
					})}
				</div>
				<div className="modal-btn-group">
					<Button content={'취소하기'} type={'modal-btn other-color'} onClick={closeModalReport} />
					<Button content={'신고하기'} type={'modal-btn'} />
				</div>
			</Modal>
			<NavBar />
		</div>
	);
}
