import Button from "../components/Button";
import { SubHeader } from "../components/Header";
import { useState } from "react";

import '../pages/Verification.scss'

const Verification = () => {

    const [isVerified, setIsVerified] = useState(2); // 초기 상태 0, 인증 성공 1, 인증 실패 2
    const [phoneNumber, setPhoneNumber] = useState('');
    const [verifyNumber, setVerifyNumber] = useState('');
    const [nextButtonType, setNextButtonType] = useState('floating disabled');

    const handleChangePhoneNumber = (e) => {
        setPhoneNumber(e.target.value);
    };

    const handleChangeVerifyNumber = (e) => {
        setVerifyNumber(e.target.value);
    };

    console.log(verifyNumber);

    // axios 요청 보내서 인증번호와 일치하면 setIsVerified(1); setNextButtonType('floating');
    // 일치하지 않으면 setIsVerified(2);

    return (
        <div className="Verification">
            <SubHeader headertext={'프로필 등록'}/>
			<div className="verificationbody">
                <div className="verifytext">
                    <p className="verifytitletext">휴대폰 본인인증</p>
                    <p className="verifysubtext">{"유니버스 생성 및 신청, 시작일 리마인드 알림을"}<br/> {"문자 메시지로 보내드려요 :)"}</p>
                </div>
                <div className="phonenuminputcontainer">
                    <p className="inputtitle">전화번호</p>
                    <div className="inputcontainer">
                        <input type="text" className="phonenuminput" placeholder="전화번호를 입력해주세요" value={phoneNumber} onChange={handleChangePhoneNumber}/>
                        <Button content={"인증번호 받기"}/>
                    </div>
                </div>
                <div className="verifyinputcontainer">
                    <p className="inputtitle">인증번호</p>
                    <div className="inputcontainer">
                        <input type="text" className="verifyinput" placeholder="인증번호를 입력해주세요" value={verifyNumber} onChange={handleChangeVerifyNumber}/>
                        <Button content={"확인"}/>
                    </div>
                    {isVerified === 1 ?  <p className="verifyresulttext" style={{color: `var(--deep-blue-color)`}}>{'인증이 완료되었습니다.'}</p> : 
                    isVerified === 2 ?  <p className="verifyresulttext" style={{color: `var(--orange-color)`}}>{'잘못된 인증번호 입니다. 다시 시도해 주세요 :('}</p> :
                    <p className="verifyresulttext"></p>}
                </div>
                <div className="nextbutton">
                    <Button type={nextButtonType} content={'다음'} />
                </div>
			</div>
        </div>
    );
};

export default Verification;