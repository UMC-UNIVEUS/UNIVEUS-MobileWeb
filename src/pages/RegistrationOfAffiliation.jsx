import { useEffect, useState } from 'react';
import './RegistrationOfAffiliation.scss';
import { SubHeader } from '../components/Header';
import NavBar from '../components/NavBar';
import Button from '../components/Button';

export default function RegistrationOfAffiliation() {
	const [major, setMajor] = useState('');
	const [studentID, setStudentID] = useState();
	const [majorFontColor, setMajorFontColor] = useState('--select-default-color');

	useEffect(() => {
		setMajorFontColor('--light-gray-color');
	}, []);

	const handleSelectMajor = (e) => {
		setMajor(e.target.value);
		setMajorFontColor('--black-color');
	};

	const handleStudentID = (e) => {
		setStudentID(e.target.value.replace(/[^0-9]/g, ''));
	};

	return (
		<div className="registration-of-affiliation">
			<SubHeader headertext={'소속등록'} />
			<div className="roa-body">
				<div className="roa-title">
					<div className="roa-main">경기대 소속등록</div>
					<div className="roa-sub">유니버스는 유저간의 신뢰를 바탕으로 해요.</div>
					<div className="roa-sub">불건전한 언행을 방지하고 건전한 모임문화를 위해 필요해요.</div>
				</div>
				<div className="roa-form">
					<div className="roa-input-group">
						<label htmlFor="roa-major">학과</label>
						<select
							name="majors"
							className="roa-input"
							id="roa-major"
							onChange={handleSelectMajor}
							required
							defaultValue="default-text"
							style={{ color: `var(${majorFontColor})` }}
						>
							<option value="default-text" className="roa-major-default" disabled>
								소속 학부를 선택해주세요.
							</option>
							<option value="인문대학">인문대학</option>
							<option value="예술체육대학">예술체육대학</option>
							<option value="사회과학대학">사회과학대학</option>
							<option value="소프트웨어경영대학">소프트웨어경영대학</option>
							<option value="융합과학대학">융합과학대학</option>
							<option value="창의공과대학">창의공과대학</option>
							<option value="관광문화대학">관광문화대학</option>
						</select>
					</div>
					<div className="roa-input-group">
						<label htmlFor="roa-studentID">학번</label>
						<input
							type="text"
							id="stuedentID"
							onChange={handleStudentID}
							maxLength="9"
							placeholder="전체 학번을 입력해 주세요"
							value={studentID}
							className="roa-input"
						/>
					</div>
					<div className="roa-error-message">허위 학번을 입력 할 시 서비스 이용에 제제가 있을 수 있습니다.</div>
				</div>
				<Button type={'floating'} content={'다음'} />
			</div>
			<NavBar />
		</div>
	);
}
