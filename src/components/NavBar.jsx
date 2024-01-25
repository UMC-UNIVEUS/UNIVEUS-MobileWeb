import './NavBar.scss';
import { useState, useEffect } from 'react';
import { ReactComponent as Home } from '../assets/images/earth.svg';
import { ReactComponent as Search } from '../assets/images/rocket.svg';
import { ReactComponent as MyPage } from '../assets/images/person.svg';
import { ReactComponent as Chat } from '../assets/images/chat.svg';

export default function NavBar(present) {
	const [classHome, setClassHome] = useState('');
	const [classChat, setClassChat] = useState('');
	const [classMypage, setClassMypage] = useState('');
	useEffect(() => {
		if (Object.values(present)[0] === 'home') {
			setClassHome('nb-home');
		} else if (Object.values(present)[0] === 'chat') {
			setClassChat('nb-chat');
		} else if (Object.values(present)[0] === 'mypage') {
			setClassMypage('nb-mypage');
		}
	}, []);
	return (
		<div className="nav-bar">
			<a className={`nb-link home ${classHome}`} href="/home">
				<Home className="nb-btn-img" />
				<span className="nb-btn-text">홈</span>
			</a>
			<a className={`nb-link chat ${classChat}`} href="/chat">
				<Chat className="nb-btn-img chat" />
				<span className="nb-btn-text">모임채팅</span>
			</a>
			<a className={`nb-link person ${classMypage}`} href="/mypage">
				<MyPage className="nb-btn-img person" />
				<span className="nb-btn-text">마이페이지</span>
			</a>
		</div>
	);
}
