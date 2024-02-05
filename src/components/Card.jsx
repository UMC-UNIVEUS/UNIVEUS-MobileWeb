import './Card.scss';
import Button from './Button';
import MaleIcon from '../assets/images/male.svg';
import FemaleIcon from '../assets/images/female.svg';
import Profile from './Profile';
import { ReactComponent as Membership } from '../assets/images/membership.svg';
import { ReactComponent as Calendar } from '../assets/images/calendar.svg';
import { ReactComponent as People } from '../assets/images/people.svg';
import DefaultImg from '../assets/images/default_image.png';
import { useNavigate } from 'react-router-dom';

export default function Card({
	nickname,
	gender,
	major,
	student_id,
	membership,
	user_img,
	title,
	limit_gender,
	limit_people,
	current_people,
	main_img,
	post_status,
	meeting_year,
	meeting_month,
	meeting_date,
	meeting_time,
	category,
	id,
}) {
	const navigate = useNavigate();
	return (
		<div
			className="card"
			onClick={() => {
				navigate(`/post/${id}`);
			}}
		>
			<div
				className="card-img"
				style={{
					backgroundImage: main_img ? `url(${main_img})` : `url(${DefaultImg})`,
				}}
			></div>
			<div className="card-content">
				<div className="card-sticker-group">
					{/* 조건으로 성별에 따라 다르게 만들기 */}
					{limit_gender === 'WOMAN' ? (
						<div className="cardc-gender-sticker" style={{ backgroundColor: 'var(--orange-color)' }}>
							<img src={FemaleIcon} alt="성별 스티커" className="cardc-gender-img" />
							<span className="cardc-gender-text">ONLY</span>
						</div>
					) : limit_gender === 'MAN' ? (
						<div className="cardc-gender-sticker" style={{ backgroundColor: 'var(--purple-color)' }}>
							<img src={MaleIcon} alt="성별 스티커" className="cardc-gender-img" />
							<span className="cardc-gender-text">ONLY</span>
						</div>
					) : (
						<></>
					)}
					<div className="cardc-category-sticker">{category}</div>
				</div>
				<div className="card-info-group">
					<div className="cardi-profile-group">
						<Profile gender={gender} profileImg={user_img} />
						{membership === 'NO' ? <></> : <Membership className="cardi-pg-membership" />}
					</div>
					<div className="cardi-title">{title}</div>
					<div className="cardi-bottom-group">
						<div className="cardi-schedule-group">
							<Calendar className="cardi-sg-img" />
							<span className="cardi-sg-date">
								{meeting_month}월{meeting_date}일
							</span>
							<span className="cardi-sg-time">{meeting_time}</span>
						</div>
						<div className="cardi-people-group">
							<People className="cardi-peg-img" />
							<span className="cardi-peg-number">
								{current_people}/{limit_people}
							</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
