import '../pages/SearchPage.scss';

import { MainHeader } from '../components/Header';
import { ReactComponent as Search } from '../assets/images/search.svg';
import axios from 'axios';
import { useState } from 'react';
import MeetingCard from '../components/MeetingCard';
import { useSelector } from 'react-redux';
import NavBar from '../components/NavBar';
import { useNavigate } from 'react-router-dom';

const SearchPage = () => {
	const [searchedData, setSearchedData] = useState([]);
	const [searchWord, setSearchWord] = useState([]);

	const navigate = useNavigate();

	const handleChange = (event) => {
		setSearchWord(event.target.value);
	};

	const jwtToken = sessionStorage.getItem('accessToken');

	const handleSearch = () => {
		axios({
			headers: {
				'x-access-token': jwtToken,
			},
			method: 'get',
			url: `https://univeus.site/search?keyword=${searchWord}`,
		}).then((response) => {
			if (response.data.code === 5000 || response.data.code === 5001) {
				navigate('/');
			} else if (response.data.code === 7000) {
				navigate('/search');
			} else {
				setSearchedData(response.data.result);
			}
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
					/>
				</div>
				<div className="horizontalbar"></div>
				{searchedData ? (
					<div className="searcheddatacontainer">
						{searchedData.map((it) => (
							<MeetingCard {...it} />
						))}
					</div>
				) : (
					<p className="nodatatext">찾으시는 검색 결과가 없습니다.</p>
				)}
			</div>
			<NavBar present={'search'} />
		</div>
	);
};

export default SearchPage;
