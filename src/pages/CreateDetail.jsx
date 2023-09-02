import './CreateDetail.scss';
import Button from '../components/Button';
import Minus from '../assets/images/minus_blue.svg';
import Plus from '../assets/images/plus_blue.svg';
import { SubHeader } from '../components/Header';
export default function CreateDetail() {
	return (
		<div className="create-detail">
			<SubHeader headertext={'유니버스 생성'} />
			<div className="cd-body">
				<div className="cd-page">
					<div className="page-tap">1. 상세 정보 입력</div>
					<div className="page-tap">2. 소개글 글쓰기</div>
				</div>
				<div className="cd-form">
					<div className="cd-category"></div>
					<div className="cd-person-choice">
						<div className="pc-title">인원선택</div>
						<input type="radio" name="gender" id="nogender" value={1} />
						<label htmlFor="nogender">성별무관</label>
						<input type="radio" name="gender" id="male" value={1} />
						<label htmlFor="male">남자만</label>
						<input type="radio" name="gender" id="female" value={2} />
						<label htmlFor="female">여자만</label>
					</div>
					<div className="cd-person-number">
						<img className="pn-minus" src={Minus} alt="마이너스 버튼" />
						<div className="pn-input">4</div>
						<img className="pn-plus" src={Plus} alt="플러스 버튼" />
					</div>
					<div className="cd-meet-date">
						<div className="md-row">
							<label className="md-date-label" htmlFor="md-start-date">
								모임일자
							</label>
							<input className="md-date-input" type="date" id="md-start-date" />
							<label className="md-time-label" htmlFor="md-start-time">
								시간
							</label>
							<input className="md-time-input" type="time" id="md-start-time" />
						</div>
						<div className="md-row">
							<label className="md-date-label" htmlFor="md-end-date">
								마감일자
							</label>
							<input className="md-date-input" type="date" id="md-end-date" />
							<label className="md-time-label" htmlFor="md-end-time">
								시간
							</label>
							<input className="md-time-input" type="time" id="md-end-time" />
						</div>
					</div>
					<div className="cd-meet-location">
						<div className="ml-title">모임위치</div>
						<div className="ml-ex">ex) 이스퀘어 앞, 5강의동 벤치 앞</div>
						<input type="text" placeholder="모임 할 장소를 정해 주세요" />
					</div>
					<div className="cd-contact">
						<div className="cc-title">연락 수단</div>
						<input type="text" placeholder="오픈채팅방을 개설한 뒤 링크를 붙여넣어 주세요" />
					</div>
				</div>
				<Button type={'floating'} content={'다음'} />
			</div>
		</div>
	);
}
