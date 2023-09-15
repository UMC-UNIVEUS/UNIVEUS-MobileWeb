import './NavBar.scss';
import { useState, useEffect } from 'react';
import { ReactComponent as Home } from '../assets/images/earth.svg';
import { ReactComponent as Search } from '../assets/images/rocket.svg';
import { ReactComponent as MyPage } from '../assets/images/person.svg';

export default function NavBar(present) {
	const [classHome, setClassHome] = useState('');
	const [classSearch, setClassSearch] = useState('');
	const [classMypage, setClassMypage] = useState('');
	useEffect(() => {
		if (Object.values(present)[0] === 'home') {
			setClassHome('nb-home');
		} else if (Object.values(present)[0] === 'search') {
			setClassSearch('nb-search');
		} else if (Object.values(present)[0] === 'mypage') {
			setClassMypage('nb-mypage');
		}
	}, []);
	return (
		<div className="nav-bar">
			<a className={`nb-link ${classHome}`} href="/home" style={{ marginRight: '96px' }}>
				<Home className="nb-btn-img" />
				<span className="nb-btn-text">홈</span>
			</a>
			<a className={`nb-link ${classSearch}`} href="/search" style={{ marginRight: '80px' }}>
				<Search className="nb-btn-img" />
				<span className="nb-btn-text">검색</span>
			</a>
			<a className={`nb-link ${classMypage}`} href="/myunive">
				<MyPage className="nb-btn-img" />
				<span className="nb-btn-text">마이페이지</span>
			</a>
		</div>
	);
}
