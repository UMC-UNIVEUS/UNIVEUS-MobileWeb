import './SelfIntroductionEdit.scss';
import { SubHeader } from '../components/Header';
import NavBar from '../components/NavBar';
import { useNavigate } from 'react-router-dom';

export default function SelfIntroductionEdit() {
	const navigate = useNavigate();

	return (
		<div className="self-introduction-edit">
			<SubHeader
				headertext={'나의 자기소개 작성'}
				textBtn={'완료'}
				onClick={() => navigate('/profile/self-introduction')}
			/>
			<div className="sie-body">
				<div className="sie-title">
					<div className="sie-main">N문 N답!</div>
					<div className="sie-main">간단하게 나를 소개해요 :)</div>
				</div>
				<div className="sie-content">
					{[
						['나의 MBTI는', 'ISFP'],
						['나의 최애 음식은', '치킨'],
					].map((li) => {
						return (
							<div className="sie-qa-box">
								<div className="sie-question-group">
									<div className="sie-dot">&#183;</div>
									<div className="sie-question">{li[0]}</div>
								</div>
								<input type="text" placeholder="답변을 입력해주세요." className="sie-answer" maxLength={30} />
							</div>
						);
					})}
				</div>
			</div>
			<NavBar />
		</div>
	);
}
