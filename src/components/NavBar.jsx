import './NavBar.scss';

import Home from '../assets/images/earth.svg';
import Search from '../assets/images/search.svg';
import MyPage from '../assets/images/person.svg';

export default function NavBar() {
	return (
		<div className="nav-bar">
			<div className="nb-home">
				<img className="nb-btn-img" src="" alt="" />
				<span className="nb-btn-text"></span>
			</div>
			<div className="nb-search">
				<img className="nb-btn-img" src="" alt="" />
				<span className="nb-btn-text"></span>
			</div>
			<div className="nb-mypage">
				<img className="nb-btn-img" src="" alt="" />
				<span className="nb-btn-text"></span>
			</div>
		</div>
	);
}
