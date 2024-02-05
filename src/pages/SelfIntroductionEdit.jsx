import './SelfIntroductionEdit.scss';
import { SubHeader } from '../components/Header';
import NavBar from '../components/NavBar';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function SelfIntroductionEdit() {
	const navigate = useNavigate();
	const [answer, setAnswer] = useState([]);
	const [isAnswer, setIsAnswer] = useState(true);
	const QUESTION = [
		'나의 MBTI는',
		'나의 최애 음식은',
		'내가 요새 듣는노래는',
		'나의 관심사는',
		'이런 사람이랑 잘 맞아요',
		'대학생활동안 제일 해보고 싶은건',
	];

	const handleInputChange = (idx, e) => {
		const newInputs = [...answer];
		newInputs[idx] = e.target.value;
		setAnswer(newInputs);
	};

	// 채연 토큰
	const jwtToken =
		'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEwLCJpYXQiOjE3MDU0NzE2MjMsImV4cCI6MTcxNDExMTYyMywiaXNzIjoidW5pdmV1cyJ9.FZ5uso5nr375V9N9IIT14KiKAW5GjPLZxWiFYsSdoAQ';

	// 유저가 작성한 답변 불러오기
	const axiosGet = async () => {
		const res = await axios.get(`/profile/mypage/introduction`, {
			headers: {
				'x-access-token': jwtToken,
			},
		});
		console.log(res);
		if (res.data.result.userIntroduction.code === 'PROFILE0001') {
			setIsAnswer(false);
			setAnswer(['', '', '', '', '', '']);
		} else {
			setIsAnswer(true);
			setAnswer(Object.values(res.data.result.userIntroduction));
		}
	};

	// 작성한 답변 보내기
	const axiosPost = async () => {
		try {
			const res = await axios.post(
				'/profile/introduction',
				{
					q1: answer[0],
					q2: answer[1],
					q3: answer[2],
					q4: answer[3],
					q5: answer[4],
					q6: answer[5],
				},
				{
					headers: { 'x-access-token': jwtToken },
				}
			);
			console.log('작성한 답변 전송', res);
		} catch (error) {
			console.log(error);
		}
	};

	// 답변 수정사항 보내기
	const axiosPut = async () => {
		try {
			const res = await axios.put(
				'/profile/introduction',
				{
					q1: answer[0],
					q2: answer[1],
					q3: answer[2],
					q4: answer[3],
					q5: answer[4],
					q6: answer[5],
				},
				{
					headers: { 'x-access-token': jwtToken },
				}
			);
			console.log('수정사항 전송', res);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		axiosGet();
	}, []);

	return (
		<div className="self-introduction-edit">
			<SubHeader
				headertext={'나의 자기소개 작성'}
				textBtn={'완료'}
				onClick={() => {
					isAnswer ? axiosPut() : axiosPost();
					// navigate('/profile/self-introduction');
				}}
			/>
			<div className="sie-body">
				<div className="sie-title">
					<div className="sie-main">N문 N답!</div>
					<div className="sie-main">간단하게 나를 소개해요 :)</div>
				</div>
				<div className="sie-content">
					{QUESTION.map((q, idx) => {
						return (
							<div className="sie-qa-box">
								<div className="sie-question-group">
									<div className="sie-dot">&#183;</div>
									<div className="sie-question">{q}</div>
								</div>
								<input
									type="text"
									placeholder="답변을 입력해주세요."
									className="sie-answer"
									maxLength={30}
									key={idx}
									value={answer[idx]}
									onChange={(e) => {
										handleInputChange(idx, e);
									}}
								/>
							</div>
						);
					})}
				</div>
			</div>
			<NavBar />
		</div>
	);
}
