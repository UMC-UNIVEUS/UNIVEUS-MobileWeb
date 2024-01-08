import '../components/Header.scss';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as Bell } from '../assets/images/bell.svg';
import { ReactComponent as BadgedBell } from '../assets/images/bell-badged.svg';
import { ReactComponent as Search } from '../assets/images/search.svg';
import { ReactComponent as Logo } from '../assets/images/logo.svg';
import { ReactComponent as Arrow } from '../assets/images/arrow.svg';

export const MainHeader = () => {
	const [isNewAlarm, setIsNewAlarm] = useState(false); // 새 알람 여부 State

	const navigate = useNavigate();

	return (
		<div className="MainHeader">
			<div className="header-left" onClick={() => navigate('/home')}>
				<Logo />
				<div className="headertext">
					<p className="univeus">UNIVE.US</p>
					<p className="kgu">KGU</p>
				</div>
			</div>
			<div className="header-right">
				<Search className="search-img" onClick={() => navigate('/search')} />
				{isNewAlarm === false ? <Bell className="bell-img" /> : <BadgedBell className="badged-bell-img" />}
			</div>
		</div>
	);
};

export const SubHeader = ({ headertext, textBtn, navLink }) => {
	const navigate = useNavigate();
	return (
		<div className="SubHeader">
			<Arrow className="back-btn" onClick={() => navigate(-1)} />
			<div className="headertext">{headertext}</div>

			<div
				className="header-text-btn"
				style={{ display: textBtn ? 'block' : 'none' }}
				onClick={() => (navLink ? navigate(`/${navLink}`) : '')}
			>
				{textBtn}
			</div>
		</div>
	);
};
