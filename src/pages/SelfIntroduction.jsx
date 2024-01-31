import './SelfIntroduction.scss';
import { SubHeader } from '../components/Header';
import NavBar from '../components/NavBar';
import Button from '../components/Button';
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function SelfIntroduction() {
	const navigate = useNavigate();
	const { id } = useParams();
	const [answer, setAnswer] = useState(['', '', '', '', '', '']);

	const QUESTION = [
		'나의 MBTI는',
		'나의 최애 음식은',
		'내가 요새 듣는노래는',
		'나의 관심사는',
		'이런 사람이랑 잘 맞아요',
		'대학생활동안 제일 해보고 싶은건',
	];

	const jwtToken =
		'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEwLCJpYXQiOjE3MDU0NzE2MjMsImV4cCI6MTcxNDExMTYyMywiaXNzIjoidW5pdmV1cyJ9.FZ5uso5nr375V9N9IIT14KiKAW5GjPLZxWiFYsSdoAQ';

	// 유저가 작성한 답변 불러오기
	// 본인 n문n답 조회 api 추가될 예정 => 추후 수정 필요
	const axiosGet = async () => {
		try {
			const res = await axios.get(`/profile/introduction/${id}`, {
				headers: {
					'x-access-token': jwtToken,
				},
			});

			// 데이터가 존재하는지 확인 후 사용
			if (res.data.result.userIntroduction && res.data.result.userIntroduction.length > 0) {
				setAnswer(Object.values(res.data.result.userIntroduction[0]));
			} else {
				console.error('서버 응답에 유효한 데이터가 없습니다.');
			}
		} catch (error) {
			console.error('데이터 불러오기에 실패했습니다:', error.message);
		}
	};

	useEffect(() => {
		axiosGet();
	}, []);

	return (
		<div className="self-introduction">
			<SubHeader
				headertext={'나의 자기소개'}
				textBtn={'편집'}
				onClick={() => navigate('/profile/self-introduction-edit')}
			/>
			<div className="si-body">
				<div className="si-title">
					<div className="si-main">N문 N답!</div>
					<div className="si-main">간단하게 나를 소개해요 :)</div>
				</div>
				<div className="si-content">
					{answer.map((answer, idx) => {
						return (
							<div className="si-qa-box">
								<div className="si-question-group">
									<div className="si-dot">&#183;</div>
									<div className="si-question">{QUESTION[idx]}</div>
								</div>
								<div className="si-answer">{answer ? answer : '입력하지 않은 답변입니다.'}</div>
							</div>
						);
					})}
				</div>
			</div>
			<NavBar />
		</div>
	);
}
