import './Card.scss';
import Button from './Button';
import MaleIcon from '../assets/images/male.svg';
import FemaleIcon from '../assets/images/female.svg';
import Profile from './Profile';
import { ReactComponent as Membership } from '../assets/images/membership.svg';
import { ReactComponent as Calendar } from '../assets/images/calendar.svg';
import { ReactComponent as People } from '../assets/images/people.svg';

export default function Card({
	postImg,
	gender,
	category,
	profileImg,
	writerGender,
	membership,
	title,
	date,
	time,
	peopleNumber,
}) {
	return (
		<div className="card">
			<div
				className="card-img"
				style={{
					backgroundImage:
						'url(https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/202306/25/488f9638-800c-4bac-ad65-82877fbff79b.jpg)',
				}}
			></div>
			<div className="card-content">
				<div className="card-sticker-group">
					{/* 조건으로 성별에 따라 다르게 만들기 */}
					<div className="cardc-gender-sticker" style={{ backgroundColor: 'var(--purple-color)' }}>
						<img src={MaleIcon} alt="성별 스티커" className="cardc-gender-img" />
						<span className="cardc-gender-text">ONLY</span>
					</div>
					<div className="cardc-category-sticker">우주공강</div>
				</div>
				<div className="card-info-group">
					<div className="cardi-profile-group">
						<Profile />
						<Membership className="cardi-pg-membership" />
					</div>
					<div className="cardi-title">유니버스 프론트엔드 구직중...!!!</div>
					<div className="cardi-bottom-group">
						<div className="cardi-schedule-group">
							<Calendar className="cardi-sg-img" />
							<span className="cardi-sg-date">8월14일</span>
							<span className="cardi-sg-time">15:00</span>
						</div>
						<div className="cardi-people-group">
							<People className="cardi-peg-img" />
							<span className="cardi-peg-number">2/4</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
