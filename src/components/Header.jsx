import '../components/Header.scss';
import { useState } from 'react';
import {useLocation, useNavigate, useParams} from 'react-router-dom';
import { ReactComponent as Bell } from '../assets/images/bell.svg';
import { ReactComponent as BadgedBell } from '../assets/images/bell-badged.svg';
import { ReactComponent as Search } from '../assets/images/search.svg';
import { ReactComponent as Logo } from '../assets/images/logo.svg';
import { ReactComponent as Arrow } from '../assets/images/arrow.svg';
import styled from "styled-components";

const HeaderCenter = styled.h1`
	font-size: 16px;
	font-weight: bold;
	margin-left: -40px;
`

export const MainHeader = ({displayAlarm, rightNonDisplay, displaySearchIcon, headerTitle, displayMenu }) => {
	const [isNewAlarm, setIsNewAlarm] = useState(false); // 새 알람 여부 State

	const navigate = useNavigate();
	let displaySearchIconVal = true;
	if (displaySearchIcon) {
		displaySearchIconVal = JSON.parse(displaySearchIcon)
	}
	console.log(displaySearchIcon ? 'block': 'none')
	return (
		<div className="MainHeader">
			<div className="header-left" onClick={() => navigate('/home')}>
				<Logo />
				<div className="headertext">
					<p className="univeus">UNIVE.US</p>
					<p className="kgu">KGU</p>
				</div>
			</div>
			<HeaderCenter>
				{headerTitle}
			</HeaderCenter>
			<div className="header-right" style={{ display: rightNonDisplay ? 'none' : 'block'}}>
				<Search style={{ display: displaySearchIconVal ? 'block': 'none' }} className="search-img" onClick={() => navigate('/search')} />
				{isNewAlarm === false ? <Bell style={{ display: displayAlarm ? 'block' : 'none' }} className="bell-img" /> : <BadgedBell style={{ display: displayAlarm ? 'block' : 'none' }} className="badged-bell-img" />}
			</div>
		</div>
	);
};

export const SubHeader = ({ headertext, textBtn, onClick, iconBtn }) => {
	const navigate = useNavigate();

	return (
		<div className="SubHeader">
			<Arrow className="back-btn" onClick={() => navigate(-1)} />
			<div className="headertext">{headertext}</div>

			<div className="header-text-btn">
				<div
					style={{ display: textBtn ? 'block' : 'none', color: onClick ? 'var(--deep-blue-color)' : '' }}
					onClick={onClick}
				>
					{textBtn}
				</div>
				<img src={iconBtn} alt="헤더 우측 버튼" style={{ display: iconBtn ? 'block' : 'none' }} onClick={onClick} />
			</div>
		</div>
	);
};
