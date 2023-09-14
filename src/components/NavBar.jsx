import './NavBar.scss';
import { ReactComponent as Home } from '../assets/images/earth.svg';
import { ReactComponent as Search } from '../assets/images/rocket.svg';
import { ReactComponent as MyPage } from '../assets/images/person.svg';

export default function NavBar() {
	return (
		<div className="nav-bar">
			<a className="nb-link nb-home" href="/home">
				<Home className="nb-btn-img" />
				<span className="nb-btn-text">홈</span>
			</a>
			<a className="nb-link nb-search" href="/search">
				<Search className="nb-btn-img" />
				<span className="nb-btn-text">검색</span>
			</a>
			<a className="nb-link nb-mypage" href="/myunive">
				<MyPage className="nb-btn-img" />
				<span className="nb-btn-text">마이페이지</span>
			</a>
		</div>
	);
}
