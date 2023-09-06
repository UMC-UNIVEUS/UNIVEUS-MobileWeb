// a 링크 사용시 나타나는 줄 거슬려서 잠깐 작성한 코드(react-router-dom 사용하면서 제거하기)
/* eslint-disable jsx-a11y/anchor-is-valid */

import './NavBar.scss';
import { ReactComponent as Home } from '../assets/images/earth.svg';
import { ReactComponent as Search } from '../assets/images/rocket.svg';
import { ReactComponent as MyPage } from '../assets/images/person.svg';
// import { Link } from 'react-router-dom';

// 나중에 react-router-dom으로 연결

export default function NavBar() {
	return (
		<div className="nav-bar">
			<a className="nb-link nb-home" href="/home">
				<Home className="nb-btn-img" />
				<span className="nb-btn-text">홈</span>
			</a>
			<a className="nb-link nb-search" href="/search">
				<Search className="nb-btn-img" />
				{/* <img className="nb-btn-img" src={Search} alt="검색 버튼 이미지" /> */}
				<span className="nb-btn-text">검색</span>
			</a>
			<a className="nb-link nb-mypage" href="#">
				<MyPage className="nb-btn-img" />
				{/* <img className="nb-btn-img" src={MyPage} alt="마이페이지 버튼 이미지" /> */}
				<span className="nb-btn-text">마이페이지</span>
			</a>
		</div>
	);
}
