import './Profile.scss';
import Person from '../assets/images/person_fill.svg';
import { useNavigate } from 'react-router-dom';

export default function Profile({ profileImg, gender, moveProfileId, myProfile, notMove }) {
	const navigate = useNavigate();
	return (
		<div
			className="profile"
			onClick={() => {
				myProfile ? navigate('/mypage') : navigate(`/profile/other-user-profile/${moveProfileId}`);
			}}
		>
			<div
				className="profile-img-box"
				style={{
					borderColor: gender === 'MAN' ? 'var(--purple-color)' : 'var(--orange-color)',
				}}
			>
				<img
					className="profile-img"
					src={profileImg ? profileImg : Person}
					alt="프로필 이미지"
					style={{
						width: profileImg ? '' : '50%',
						height: profileImg ? '' : '50%',
						borderRadius: profileImg ? '' : '0px',
					}}
				/>
			</div>
		</div>
	);
}
