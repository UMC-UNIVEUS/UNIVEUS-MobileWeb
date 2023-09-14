import '../components/Footer.scss';
import Insta from '../assets/images/Insta.svg';

export default function Footer() {
	return (
		<div className="footer">
			<img
				src={Insta}
				alt="인스타그램 아이콘"
				onClick={() => {
					window.location.href = 'https://www.instagram.com/unive.us/?igshid=MzMyNGUyNmU2YQ%3D%3D';
				}}
			/>
			<div className="f-text">
				<div>UNIVE.US </div>
				<div>대학생활의 로망을 실현하고 싶은 사람들의 행성</div>
			</div>
			<div className="f-text">
				<div>유니버스 (UNIVE.US) 대표자: 김동혁 | 010-5763-7106</div>
				<div>| kjundh@kyonggi.ac.kr | 2023-수원-1854</div>
			</div>
			<div className="f-text" style={{ display: 'block' }}>
				Copyright ©<span style={{ fontWeight: '700' }}>UNIVE.</span> All Rights Reserved.
			</div>
			<div className="f-text" style={{ flexDirection: 'row' }}>
				<a
					className="a-link"
					href="https://univeus.oopy.io/c9401d02-7c38-41f5-ba28-8bcf1d857d8a"
					style={{ marginRight: '14.17px' }}
				>
					이용약관
				</a>
				<a
					className="a-link"
					href="https://univeus.oopy.io/4f621393-467a-4e61-b8f8-76ada7cc9b99"
					style={{ marginRight: '14.17px' }}
				>
					개인정보제공및활용 동의
				</a>
				<a className="a-link" href="https://univeus.oopy.io/6157f35b-c400-4cc5-baa5-235de47b255a">
					문자수신동의
				</a>
			</div>
		</div>
	);
}
