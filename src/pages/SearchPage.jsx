import '../pages/SearchPage.scss';
import { MainHeader } from '../components/Header';
import { ReactComponent as Search } from '../assets/images/search.svg';
import Card from '../components/Card';
import axios from 'axios';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import NavBar from '../components/NavBar';
import { useNavigate } from 'react-router-dom';

const SearchPage = () => {
	const jwtToken = sessionStorage.getItem('accessToken');
	const [searchedData, setSearchedData] = useState([]);
	const [searchWord, setSearchWord] = useState([]);
	const [isSearch, setIsSearch] = useState(false);

	const navigate = useNavigate();

	const handleChange = (event) => {
		setSearchWord(event.target.value);
	};

	const handleSearch = () => {
		axios({
			headers: {
				'x-access-token': jwtToken,
			},
			method: 'get',
			url: `https://univeus.site/search?searchWord=${searchWord}`,
		}).then((res) => {
			console.log(res);
			setSearchedData(res.data.result);
			setIsSearch(true);
		});
	};

	return (
		<div className="SearchPage">
			<MainHeader />
			<div className="searchpagebody">
				<div className="searchpagetext">
					<p className="maintext">어떤</p>
					<p className="maintext bold">유니버스를 찾고 계신가요?</p>
				</div>
				<div className="searchinputcontainer">
					<Search className="search-img-btn" onClick={handleSearch} />
					<input
						type="text"
						className="searchinput"
						placeholder="검색어를 입력하세요"
						value={searchWord}
						onChange={handleChange}
						onKeyUp={() => {
							if (window.event.keyCode === 13) {
								handleSearch();
							}
						}}
					/>
				</div>
				<div className="horizontalbar"></div>
				{searchedData.length === 0 && !isSearch ? (
					''
				) : searchedData.length === 0 ? (
					<p className="nodatatext">찾으시는 검색 결과가 없습니다.</p>
				) : (
					<div className="searcheddatacontainer">
						{searchedData.map((data) => {
							return <Card {...data} />;
						})}
					</div>
				)}
			</div>
			<NavBar />
		</div>
	);
};

export default SearchPage;
