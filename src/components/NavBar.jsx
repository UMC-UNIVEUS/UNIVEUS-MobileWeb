import './NavBar.scss';

import Home from '../assets/images/earth.svg';
import Search from '../assets/images/search.svg';
import MyPage from '../assets/images/person.svg';

export default function NavBar() {
	return (
		<div className="nav-bar">
			<div className="nb-home">
				<img className="nb-btn-img" src={Home} alt="홈 버튼 이미지" />
				<span className="nb-btn-text">홈</span>
			</div>
			<div className="nb-search">
				<img className="nb-btn-img" src={Search} alt="검색 버튼 이미지" />
				<span className="nb-btn-text">검색</span>
			</div>
			<div className="nb-mypage">
				<img className="nb-btn-img" src={MyPage} alt="마이페이지 버튼 이미지" />
				<span className="nb-btn-text">마이페이지</span>
			</div>
		</div>
	);
}
