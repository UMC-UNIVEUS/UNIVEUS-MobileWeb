import './CreateIntro.scss';
import Button from '../components/Button';
import { SubHeader } from '../components/Header';
import NavBar from '../components/NavBar';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ImageBox from '../components/ImageBox';

export default function CreateIntro() {
	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');
	const [image, setImage] = useState([]);

	const navigate = useNavigate();

	const { post_id } = useParams;

	const getImage = (img) => {
		setImage({ ...image, [Object.keys(JSON.parse(img))[0]]: Object.values(JSON.parse(img))[0] });
		// console.log('img', Object.values(JSON.parse(img))[0]);
	};

	// console.log('image', image);
	// console.log('image', Object.values(image));
	const handleTitle = (e) => {
		setTitle(e.target.value);
	};

	const handleContent = (e) => {
		setContent(e.target.value);
	};

	function repeatImageBox(repeatNum) {
		let arr = [];
		for (let i = 1; i < repeatNum + 1; i++) {
			arr.push(<ImageBox key={i} numbering={i} getImage={getImage} postImg={image[i - 1]} />);
		}
		return arr;
	}
	// console.log(localStorage.getItem('images'));
	const jwtToken = sessionStorage.getItem('accessToken');

	const modifyDetailData = JSON.parse(localStorage.getItem('modify'));
	useEffect(() => {
		setTitle(modifyDetailData['title']);
		setContent(modifyDetailData['content']);
		setImage(modifyDetailData['images']);
	}, []);

	// const imageBox = JSON.parse(localStorage.getItem('images'));
	// console.log('imageBox', imageBox);

	// const jwtToken = useSelector((state) => state.jwtToken);

	const handlePosting = () => {
		axios({
			headers: {
				'x-access-token': jwtToken,
			},
			method: 'patch',
			url: `https://univeus.site/post/${post_id}`,
			data: {
				category: modifyDetailData['category'],
				limit_people: modifyDetailData['limit_people'],
				limit_gender: modifyDetailData['limit_gender'],
				location: modifyDetailData['location'],
				meeting_date: modifyDetailData['meeting_date'],
				openchat: modifyDetailData['openchat'],
				end_date: modifyDetailData['end_date'],
				title: title,
				content: content,
				images: Object.values(image),
				// invited_userNickNames: modifyDetailData[''],
			},
		}).then((res) => {
			console.log(res);
			if (res.data.result.code === 5000 || res.data.result.code === 5001) {
				navigate('/');
			} else if (res.data.message === '성공') {
				localStorage.clear();
			}
			// console.log(jwtToken);
		});
	};
	return (
		<div className="create-intro">
			<SubHeader headertext={'유니버스 생성'} />
			<div className="ci-body">
				<div className="ci-page">
					<div className="page-tap">
						<span style={{ color: 'var(--light-gray-color)' }}>1. 상세 정보 입력</span>
						<div className="page-hr" style={{ backgroundColor: 'var(--light-gray-color)' }}></div>
					</div>
					<div className="page-tap">
						<span>2. 소개글 글쓰기</span>
						<div className="page-hr"></div>
					</div>
				</div>
				<div className="ci-title">
					<div className="ct-title">제목</div>
					<input
						type="text"
						className="ct-input"
						maxLength="48"
						placeholder="센스있는 제목으로 이목을 끌어보아요 :)"
						required
						onChange={handleTitle}
						value={title}
					/>
				</div>
				<div className="ci-img-upload">
					<div className="ciu-title">이미지</div>
					<div className="ciu-img-group">
						{/* 이미지 넣는 박스 */}
						{repeatImageBox(4)}
					</div>
				</div>
				<div className="ci-content">
					<div className="cct-title">소개글 작성</div>
					<textarea
						className="cct-textarea"
						maxLength="500"
						required
						placeholder="어떤 모임을 진행할 예정인가요? 간단하게 작성해 보아요 :) &#13;&#10; &#13;&#10;
            EX)&#13;&#10;
            - 모임 주제 (바른 프로젝트 팀원을 구합니다.)&#13;&#10;
            - 원하는 분위기나, 성격&#13;&#10;
            - 원하는 과, 단과대&#13;&#10;
            - 자신의 경험 사항(프로젝트, 공모전, 대외활동 등)&#13;&#10;
            - 모임의 목표&#13;&#10;"
						onChange={handleContent}
						value={content}
					></textarea>
				</div>
				{title !== '' && content !== '' ? (
					<Button type={'floating'} content={'유니버스 생성하기'} onClick={handlePosting} />
				) : (
					<Button type={'floating disabled'} content={'미입력 된 항목이 있습니다'} />
				)}
			</div>
			<NavBar />
		</div>
	);
}
