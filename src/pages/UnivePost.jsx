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
	const navigate = useNavigate();
	const [isModalOpenWriter, setIsModalOpenWriter] = useState(false);
	const [isModalOpenPerson, setIsModalOpenPerson] = useState(false);
	const [writerClickBtn, setWriterClickBtn] = useState(''); // status, manage,approval,deadlineComplete
	const [personClickBtn, setPersonClickBtn] = useState(''); // partWait, partSuccess, partCancel, partCancelComplete, declaration
	const [declaration, setDeclaration] = useState();
	const [postData, setPostData] = useState({
		connectedUser: {
			user_id: '',
			status: '',
			gender: '',
		},
		Writer: {
			user_id: '',
			gender: '',
			nickname: '',
			student_id: '',
			major: '',
			status: '',
			mebership: '',
			user_img: '',
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
	const isWriter = postData.connectedUser.status === 'WRITER';

	const openModalWriter = () => setIsModalOpenWriter(true);

	const closeModalWriter = () => {
		setIsModalOpenWriter(false);
	};

	const openModalPerson = () => setIsModalOpenPerson(true);

	const closeModalPerson = () => {
		setIsModalOpenPerson(false);
	};

	// const jwtToken =
	// 	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsImlhdCI6MTcwNTMzMTU2MiwiZXhwIjoxNzEzOTcxNTYyLCJpc3MiOiJ1bml2ZXVzIn0.Heqp8oHlO5I5c-1l1NMod3zZT2HN5IzPmuJWixbgN3E';
	const jwtToken =
		'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEwLCJpYXQiOjE3MDU0NzE2MjMsImV4cCI6MTcxNDExMTYyMywiaXNzIjoidW5pdmV1cyJ9.FZ5uso5nr375V9N9IIT14KiKAW5GjPLZxWiFYsSdoAQ';

	useEffect(() => {
		const axiosPost = async () => {
			try {
				const res = await axios.get(`/post/${id}`, { headers: { 'x-access-token': jwtToken } });
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

	// 유니버스 모집 마감
	const recruitmentDeadline = async () => {
		try {
			await axios.patch(
				`/post/${id}/end`,
				{},
				{
					headers: {
						'x-access-token': jwtToken,
					},
				}
			);
		} catch (err) {
			console.log(err);
		}
	};

	// 유니버스 참여 신청
	const applyParticipation = async () => {
		try {
			await axios.post(
				`/post/${id}/participant/request`,
				{},
				{
					headers: {
						'x-access-token': jwtToken,
					},
				}
			);
		} catch (err) {
			console.log(err);
		}
	};

	// 유니버스 참여 승인
	const participationApproved = async (user_id) => {
		try {
			await axios.patch(
				`/post/${id}/participant/agree`,
				{
					user_id: user_id,
				},
				{
					headers: {
						'x-access-token': jwtToken,
					},
				}
			);
		} catch (err) {
			console.log(err);
		}
	};

	// 유니버스 참여 취소
	const participationCancel = async () => {
		try {
			await axios.delete(
				`/post/${id}/participant/cancel`,
				{},
				{
					headers: {
						'x-access-token': jwtToken,
					},
				}
			);
		} catch (err) {
			console.log(err);
		}
	};

	console.log(postData);

	return (
		<div className="unive-post">
			{/* 본인 포스트인지 여부에 따라 헤더 변경 */}
			{isWriter ? (
				<SubHeader
					headertext={postData.Post.category}
					iconBtn={Calendar}
					onClick={() => {
						setWriterClickBtn('status');
						openModalWriter();
					}}
				/>
			) : (
				<SubHeader
					headertext={postData.Post.category}
					iconBtn={Declaration}
					onClick={() => {
						setPersonClickBtn('declaration');
						openModalPerson();
					}}
				/>
			)}
			<div className="up-body">
				<div className="up-top">
					<div className="upt-user-info">
						<Profile gender={postData.Writer.gender} profileImg={postData.Writer.user_img} />
						<div className="upt-ui-group">
							<div className="upt-name-group">
								<span className="upt-name">{postData.Writer['nickname']}</span>
								{postData.Writer.mebership ? <Memebership /> : ''}
								{/* <Memebership /> */}
							</div>
							<div className="upt-department">
								{postData.Writer['student_id']} / {postData.Writer['major']}
							</div>
						</div>
					</div>
					<div className="upt-post-info">
						<div className="upt-pi-people-group">
							<People className="upt-pi-people-img" />
							<span className="upt-pi-people">
								{postData.Post['current_people']}/{postData.Post['limit_people']}
							</span>
						</div>
						{/* 성별 제한에 따라 색상 및 문구 변경하기 */}
						{/* <div className="upt-pi-gender"></div> */}
						{postData.Post['limit_gender'] === 'MAN' ? (
							<div className="upt-pi-gender">
								<MaleIcon className="upt-pi-gender-img" />
								<span className="upt-pi-gender-text">ONLY</span>
							</div>
						) : postData.Post['limit_gender'] === 'WOMAN' ? (
							<div className="upt-pi-gender" style={{ backgroundColor: 'var(--orange-color)' }}>
								<FemaleIcon className="upt-pi-gender-img" />
								<span className="upt-pi-gender-text">ONLY</span>
							</div>
						) : (
							<div className="upt-pi-gender" style={{ backgroundColor: 'transparent' }}></div>
						)}
					</div>
				</div>
				<div className="up-meeting-box">
					<div className="up-mb-deadline-group">
						<Exclamation />
						<span className="up-mb-deadline-date">
							{postData.Post.end_datetime.substring(0, 4)}년 {postData.Post.end_datetime.substring(5, 7)}월{' '}
							{postData.Post.end_datetime.substring(8, 10)}일 마감
						</span>
					</div>
					<div className="up-mb-metting-group">
						<div className="up-mb-title">모임 일시</div>
						<div className="up-mb-data">
							{postData.Post.meeting_datetime.substring(0, 4)}년 {postData.Post.meeting_datetime.substring(5, 7)}월{' '}
							{postData.Post.meeting_datetime.substring(8, 10)}일 / {postData.Post.meeting_datetime.substring(11, 16)}
						</div>
					</div>
					<div className="up-mb-metting-group">
						<div className="up-mb-title">모임 장소</div>
						<div className="up-mb-data">{postData.Post.location}</div>
					</div>
				</div>
				<div className="up-content-box">
					<div className="up-cb-title">{postData.Post.title}</div>
					<div className="up-cb-textarea">{postData.Post.contents}</div>
				</div>
				<div className="up-image-box">
					{postData.PostImages.map((img, idx) => {
						return <img src={img} alt={`이미지${idx}`} className="up-img" />;
					})}
				</div>
				<div className="up-hr"></div>
				<div className="up-participant-box">
					<div className="up-pb-text">이런 친구들이 함께해요 !</div>
					<div className="up-pb-group">
						{postData.ParticipantList.length === 0 ? (
							<div className="up-pb-none-text">아직 참여중인 친구가 없어요!</div>
						) : (
							postData.ParticipantList.map((part) => {
								const participation = part.status === 'PARTICIPATING';
								return (
									<div
										className="up-pb-bundle"
										style={{ backgroundColor: participation ? '' : 'var(--white-gray-color)' }}
									>
										<div className="up-pb-user-info">
											<Profile gender={part.gender} profileImg={part.user_img} />
											<div className="up-pb-user-name-group">
												<div className="up-pb-name">{part.nickname}</div>
												<div className="up-pb-department">
													{part.student_id} / {part.major}
												</div>
											</div>
										</div>
										{isWriter ? (
											participation ? (
												<div className="up-pb-situation">참여중</div>
											) : (
												<div
													className="up-pb-situation-btn"
													onClick={() => {
														participationApproved(part.user_id);
														setWriterClickBtn('approval');
														openModalWriter();
													}}
												>
													승인하기
												</div>
											)
										) : (
											<div className="up-pb-situation">{participation ? '참여중' : '대기중'}</div>
										)}
									</div>
								);
							})
						)}
					</div>
				</div>
				{/* 상태에 따라 버튼 여부와 문구가 변경 */}
				{postData.Post.post_status === 'RECRUITING' ? (
					isWriter ? (
						<Button
							type={'floating fix'}
							content={'유니버스 관리하기'}
							onClick={() => {
								setWriterClickBtn('manage');
								openModalWriter();
							}}
						/>
					) : postData.connectedUser.status === 'PARTICIPATING' || postData.connectedUser.status === 'WAITING' ? (
						<Button
							type={'floating fix'}
							content={'참여 취소하기'}
							onClick={() => {
								setPersonClickBtn('partCancel');
								openModalPerson();
							}}
						/>
					) : postData.Post.limit_gender !== 'ALL' && postData.Post.limit_gender !== postData.connectedUser.gender ? (
						<Button type={'floating fix disabled'} content={'참여 불가능한 성별입니다'} />
					) : (
						<Button
							type={'floating fix'}
							content={'유니버스 참여하기'}
							onClick={
								postData.Post.participation_method === '자동승인'
									? () => {
											applyParticipation();
											setPersonClickBtn('partSuccess');
											openModalPerson();
									  }
									: () => {
											applyParticipation();
											setPersonClickBtn('partWait');
											openModalPerson();
									  }
							}
						/>
					)
				) : (
					<Button type={'floating fix disabled'} content={'유니버스 모집 종료'} />
				)}
			</div>
			{isWriter ? (
				<Modal
					isOpen={isModalOpenWriter}
					closeModal={closeModalWriter}
					title={
						writerClickBtn === 'status'
							? '유니버스 상태 변경'
							: writerClickBtn === 'manage'
							? '유니버스 관리하기'
							: writerClickBtn === 'approval'
							? '참여자 승인완료!'
							: writerClickBtn === 'deadlineComplete'
							? '모집 마감이 완료되었습니다.'
							: ''
					}
				>
					{writerClickBtn === 'status' ? (
						// 상태 변경 모달
						<>
							<p style={{ color: 'rgba(0, 0, 0, 0.60)' }}>
								마감일 보다 일찍 유니버스 모집을 종료하고 싶다면 마감하기를 눌러 상태를 변경할 수 있어요
							</p>
							<div className="modal-btn-group">
								<Button
									content={'취소하기'}
									type={'modal-btn other-color'}
									onClick={() => {
										closeModalWriter();
										navigate(`/post/${id}`);
									}}
								/>
								<Button
									content={'마감하기'}
									type={'modal-btn'}
									onClick={() => {
										recruitmentDeadline();
										setWriterClickBtn('deadlineComplete');
										openModalWriter();
									}}
								/>
							</div>
						</>
					) : writerClickBtn === 'manage' ? (
						// 관리하기 모달
						<>
							<p style={{ color: 'rgba(0, 0, 0, 0.60)' }}>내 유니버스를 수정하거나 삭제할 수 있어요.</p>
							<p style={{ color: 'rgba(0, 0, 0, 0.60)' }}>모집 상태 변경은 게시글 우상단을 확인해주세요.</p>
							<div className="modal-btn-group">
								<Button
									content={'수정하기'}
									type={'modal-btn other-color'}
									onClick={() => {
										navigate(`/modify/post-level1/${postData.Post.id}`);
									}}
								/>
								<Button content={'삭제하기'} type={'modal-btn'} onClick={() => {}} />
							</div>
						</>
					) : writerClickBtn === 'approval' ? (
						// 참여승인 완료 모달
						<>
							<p style={{ color: 'rgba(0, 0, 0, 0.60)' }}>해당 친구의 유니버스 참여가 승인되었어요.</p>
							<p style={{ color: 'rgba(0, 0, 0, 0.60)' }}>친구들과 즐거운 모임이 되길 바랄게요!</p>
							<Button
								content={'확인'}
								type={'floating'}
								onClick={() => {
									closeModalWriter();
									navigate(`/post/${id}`);
								}}
							/>
						</>
					) : writerClickBtn === 'deadlineComplete' ? (
						// 마감 완료 모달
						<>
							<p style={{ color: 'rgba(0, 0, 0, 0.60)' }}>다시 모집하고 싶으시다면</p>
							<p style={{ color: 'rgba(0, 0, 0, 0.60)' }}>새로운 게시글을 작성해주세요.</p>
							<Button
								content={'확인'}
								type={'floating'}
								onClick={() => {
									closeModalWriter();
									navigate(`/post/${id}`);
								}}
							/>
						</>
					) : (
						''
					)}
				</Modal>
			) : !isWriter ? (
				<Modal
					isOpen={isModalOpenPerson}
					closeModal={closeModalPerson}
					title={
						personClickBtn === 'partWait'
							? '유니버스 참여대기 완료!'
							: personClickBtn === 'partSuccess'
							? '유니버스 참여완료!'
							: personClickBtn === 'partCancel'
							? '참여를 취소하시겠어요?'
							: personClickBtn === 'partCancelComplete'
							? '참여 취소가 완료되었습니다.'
							: personClickBtn === 'declaration'
							? '게시글을 신고하시겠어요?'
							: ''
					}
				>
					{personClickBtn === 'partWait' ? (
						// 참여대기 모달
						<>
							<p style={{ color: 'rgba(0, 0, 0, 0.60)' }}>해당 유니버스는 방장의 승인이 필요해요 :)</p>
							<p style={{ color: 'rgba(0, 0, 0, 0.60)' }}>승인 시 알림을 보내드릴게요.</p>
							<Button
								content={'확인'}
								type={'floating'}
								onClick={() => {
									closeModalPerson();
									navigate(`/post/${id}`);
								}}
							/>
						</>
					) : personClickBtn === 'partSuccess' ? (
						// 참여완료 모달
						<>
							<p style={{ color: 'rgba(0, 0, 0, 0.60)' }}>유니버스에 참여가 완료되었어요.</p>
							<p style={{ color: 'rgba(0, 0, 0, 0.60)' }}>채팅방에 입장하여 인사로 시작해 볼까요?</p>
							<div className="modal-btn-group">
								<Button
									content={'나중에 할래요'}
									type={'modal-btn other-color'}
									onClick={() => {
										closeModalPerson();
										navigate(`/post/${id}`);
									}}
								/>
								<Button
									content={'채팅방 입장'}
									type={'modal-btn'}
									onClick={() => {
										navigate('/chat');
									}}
								/>
							</div>
						</>
					) : personClickBtn === 'partCancel' ? (
						// 참여 취소 모달
						<>
							<p style={{ color: 'rgba(0, 0, 0, 0.60)' }}>
								취소 즉시 채팅방에서 퇴장되며 잦은 취소는 패널티가 부여 될 수 있습니다.
							</p>
							<div className="modal-btn-group">
								<Button content={'참여유지'} type={'modal-btn other-color'} onClick={closeModalPerson} />
								<Button
									content={'참여 취소'}
									type={'modal-btn'}
									onClick={() => {
										setPersonClickBtn('partCancelComplete');
										openModalPerson();
									}}
								/>
							</div>
						</>
					) : personClickBtn === 'partCancelComplete' ? (
						// 참여 취소 완료 모달
						<>
							<p style={{ color: 'rgba(0, 0, 0, 0.60)' }}>
								다른 유니버스를 찾아보거나 내가 하고 싶은 유니버스를 생성해도 좋아요
							</p>
							<Button
								content={'확인'}
								type={'floating'}
								onClick={() => {
									closeModalPerson();
									navigate(`/post/${id}`);
								}}
							/>
						</>
					) : personClickBtn === 'declaration' ? (
						// 게시글 신고 모달
						<>
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
								<Button
									content={'취소하기'}
									type={'modal-btn other-color'}
									onClick={() => {
										closeModalPerson();
										navigate(`/post/${id}`);
									}}
								/>
								<Button content={'신고하기'} type={'modal-btn'} />
							</div>
						</>
					) : (
						''
					)}
				</Modal>
			) : (
				<></>
			)}
			<NavBar />
		</div>
	);
}
