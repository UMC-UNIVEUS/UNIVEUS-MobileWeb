import './SelfIntroduction.scss';
import { SubHeader } from '../components/Header';
import NavBar from '../components/NavBar';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';

export default function SelfIntroduction() {
	const navigate = useNavigate();

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
					{[
						['나의 MBTI는', 'ISFP'],
						['나의 최애 음식은', '치킨'],
					].map((li) => {
						return (
							<div className="si-qa-box">
								<div className="si-question-group">
									<div className="si-dot">&#183;</div>
									<div className="si-question">{li[0]}</div>
								</div>
								<div className="si-answer">{li[1]}</div>
							</div>
						);
					})}
					<div className="si-qa-box">
						<div className="si-question-group">
							<div className="si-dot">&#183;</div>
							<div className="si-question">ddd dsafkdsf </div>
						</div>
						<div className="si-answer">fdd</div>
					</div>
				</div>
			</div>
			<NavBar />
		</div>
	);
}
