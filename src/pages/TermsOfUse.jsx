import { useState } from 'react';
import './TermsOfUse.scss';
import { SubHeader } from '../components/Header';
import NavBar from '../components/NavBar';
import Button from '../components/Button';
import { ReactComponent as Check } from '../assets/images/check.svg';
import { ReactComponent as RedCheck } from '../assets/images/redcheck.svg';

export default function TermsOfUse() {
	const [isCheckedAll, setIsCheckedAll] = useState(false);
	const [isChecked1, setIsChecked1] = useState(false);
	const [isChecked2, setIsChecked2] = useState(false);
	const [isChecked3, setIsChecked3] = useState(false);

	const handleCheckAll = () => {
		setIsCheckedAll(!isCheckedAll);
		if (isCheckedAll === true) {
			setIsChecked1(false);
			setIsChecked2(false);
			setIsChecked3(false);
		} else {
			setIsChecked1(true);
			setIsChecked2(true);
			setIsChecked3(true);
		}
	};

	const handleCheck1 = () => {
		setIsChecked1(!isChecked1);
		if (isChecked2 === true && isChecked3 === true) {
			setIsCheckedAll(true);
		}
		if (isChecked1 === true) {
			setIsCheckedAll(false);
		}
	};

	const handleCheck2 = () => {
		setIsChecked2(!isChecked2);
		if (isChecked1 === true && isChecked3 === true) {
			setIsCheckedAll(true);
		}
		if (isChecked2 === true) {
			setIsCheckedAll(false);
		}
	};

	const handleCheck3 = () => {
		setIsChecked3(!isChecked3);
		if (isChecked1 === true && isChecked2 === true) {
			setIsCheckedAll(true);
		}
		if (isChecked3 === true) {
			setIsCheckedAll(false);
		}
	};
	return (
		<div className="terms-of-use">
			<SubHeader headertext={'약관동의'} />
			<div className="tou-body">
				<div className="tou-title">
					<div className="tou-main">유니버스 이용약관</div>
					<div className="tou-sub">유니버스를 이용하기위해 동의해야하는 항목이에요 :)</div>
					<div className="tou-sub">건강한 모임문화를 위해 동의가 필요해요.</div>
				</div>
				<div className="agreecontainer">
					<div className="checkline">
						<button onClick={handleCheckAll} className="checkbutton">
							{isCheckedAll ? <RedCheck /> : <Check />}
						</button>
						<p className="allchecktext">약관 전체동의</p>
					</div>
					<div className="horizontal_bar"></div>
					<div className="each_check_container">
						<div className="each_check">
							<div className="checkline">
								<button onClick={handleCheck1} className="checkbutton">
									{isChecked1 ? <RedCheck /> : <Check />}
								</button>
								<p className="eachchecktext">이용약관 동의</p>
							</div>
							<a
								href="https://univeus.oopy.io/c9401d02-7c38-41f5-ba28-8bcf1d857d8a"
								target="_blank"
								rel="noopener noreferrer"
								className="termslink"
							>
								보기
							</a>
						</div>
						<div className="each_check">
							<div className="checkline">
								<button onClick={handleCheck2} className="checkbutton">
									{isChecked2 ? <RedCheck /> : <Check />}
								</button>
								<p className="eachchecktext">개인정보 제공 및 활용 동의</p>
							</div>
							<a
								href="https://univeus.oopy.io/4f621393-467a-4e61-b8f8-76ada7cc9b99"
								target="_blank"
								rel="noopener noreferrer"
								className="termslink"
							>
								보기
							</a>
						</div>
						<div className="each_check">
							<div className="checkline">
								<button onClick={handleCheck3} className="checkbutton">
									{isChecked3 ? <RedCheck /> : <Check />}
								</button>
								<p className="eachchecktext">문자 수신 동의</p>
							</div>
							<a
								href="https://univeus.oopy.io/6157f35b-c400-4cc5-baa5-235de47b255a"
								target="_blank"
								rel="noopener noreferrer"
								className="termslink"
							>
								보기
							</a>
						</div>
					</div>
				</div>
				<Button content={'다음'} type={'floating'} />
			</div>
			<NavBar />
		</div>
	);
}
