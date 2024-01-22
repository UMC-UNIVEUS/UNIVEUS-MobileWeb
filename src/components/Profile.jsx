import './Profile.scss';
import Person from '../assets/images/person_fill.svg';

export default function Profile({ profileImg, gender }) {
	return (
		<div className="profile">
			<div
				className="profile-img-box"
				style={{
					borderColor: gender === 'male' ? 'var(--purple-color)' : 'var(--orange-color)',
				}}
			>
				<img
					className="profile-img"
					src={profileImg ? profileImg : Person}
					alt="프로필 이미지"
					style={{
						width: profileImg ? '' : '27px',
						height: profileImg ? '' : '27px',
						borderRadius: profileImg ? '' : '0px',
					}}
				/>
			</div>
		</div>
	);
}
