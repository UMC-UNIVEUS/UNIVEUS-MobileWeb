import './CreatePostLevel1.scss';
import { SubHeader } from '../components/Header';
import NavBar from '../components/NavBar';
import Button from '../components/Button';
import { useState } from 'react';

export default function CreatePostLevel1() {
	const [category, setCategory] = useState(0);
	const [participate, setParticipate] = useState(0);
	const [limitGender, setLimitGender] = useState(0); // 0 or 1 or 2
	const [limitPeople, setLimitPeople] = useState(1); // 4 or 6

	return (
		<div className="create-post-level1">
			<SubHeader headertext={'상세정보 입력'} />
			<div className="cpl1-body">
				<div className="cpl-tap">
					<div className="cplt-hr-check"></div>
					<div className="cplt-hr"></div>
					<div className="cplt-hr-text">3단계 중 1단계</div>
				</div>
				<div className="cpl-title">
					<div className="cpl-main">어떤</div>
					<div className="cpl-main">유니버스를 생성하시겠어요?</div>
				</div>
				<div className="cpl1-form">
					<div className="cpl-category">
						{[
							[0, '우주공강'],
							[1, '스펙쌓기'],
							[2, '취미/문화'],
							[3, '습관형성'],
							[4, '맛집탐방'],
							[5, '취업활동'],
							[6, '기타모임'],
						].map((data) => {
							return (
								<Button
									type={category === data[0] ? 'small checked' : 'small'}
									content={data[1]}
									onClick={() => {
										setCategory(data[0]);
									}}
								/>
							);
						})}
					</div>
					<div className="cpl-participation-method">
						<div className="cpl-pm-title">참여방식</div>
						<div className="cpl-pm-group">
							<div className="cpl-pm-btns">
								<Button
									type={participate === 0 ? 'checked' : ''}
									content={'자동승인'}
									onClick={() => {
										setParticipate(0);
									}}
								/>
								<span className="cpl-pm-explanation">참여자가 있을시 무조건 승인이에요</span>
							</div>
							<div className="cpl-pm-btns">
								<Button
									type={participate === 1 ? 'checked' : ''}
									content={'수동승인'}
									onClick={() => {
										setParticipate(1);
									}}
								/>
								<span className="cpl-pm-explanation">참여자가 있다면 승인해야해요</span>
							</div>
						</div>
					</div>
					<div className="cpl-person-choice">
						<div className="cpl-pc-title">모집인원</div>
						<input
							type="radio"
							name="gender"
							id="nogender"
							onClick={() => {
								setLimitGender(0);
							}}
							defaultChecked
						/>
						<label htmlFor="nogender">성별무관</label>
						<input
							type="radio"
							name="gender"
							id="male"
							onClick={() => {
								setLimitGender(1);
							}}
						/>
						<label htmlFor="male">남자만</label>
						<input
							type="radio"
							name="gender"
							id="female"
							onClick={() => {
								setLimitGender(2);
							}}
						/>
						<label htmlFor="female">여자만</label>
					</div>
					<div className="cpl-person-number">
						<div className="cpl-pn-btn-group">
							{[1, 2, 3, 4, 5].map((people) => {
								return (
									<div
										className={limitPeople === people ? 'pn-btn checked' : 'pn-btn'}
										onClick={() => {
											setLimitPeople(people);
										}}
									>
										{people}
									</div>
								);
							})}
						</div>
					</div>
				</div>
				<Button type={'floating next-btn'} content={'다음'} />
			</div>
			<NavBar />
		</div>
	);
}
