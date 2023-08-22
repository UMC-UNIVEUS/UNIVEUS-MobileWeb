import Button from "../components/Button";
import { SubHeader } from "../components/Header";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


import '../pages/Verification.scss'

const Verification = () => {

    // const navigate = useNavigate();

    const [isVerified, setIsVerified] = useState(0); // 초기 상태 0, 인증 성공 1, 인증 실패 2
    const [phoneNumber, setPhoneNumber] = useState('');
    const [verifyNumber, setVerifyNumber] = useState('');

    const handleChangePhoneNumber = (e) => {
        setPhoneNumber(e.target.value);
    };

    const handleChangeVerifyNumber = (e) => {
        setVerifyNumber(e.target.value);
    };

    const handleSendVerifyCode = () => {
        axios({
            method: "post",
            url: "https://univeus.site/user/send/number",
            data: { 
                phoneNumber : phoneNumber
            },
        }).then((res) => {
            console.log(res.message);
        });
    };

    const handleClickVerifyButton = () => {
        axios({
            method: "post",
            url: "https://univeus.site/user/auth/number",
            data: { 
                number : parseInt(verifyNumber)
            },
        }).then((res) => {
            if (res.data.isSuccess === true) {
                setIsVerified(1);
            } else {
                setIsVerified(2);
            }
        });
    };

    const handleClickNextButton = () => {
        // navigate('')
    }    

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
                        <Button content={"인증번호 받기"} onClick={handleSendVerifyCode}/>
                    </div>
                </div>
                <div className="verifyinputcontainer">
                    <p className="inputtitle">인증번호</p>
                    <div className="inputcontainer">
                        <input type="text" className="verifyinput" placeholder="인증번호를 입력해주세요" value={verifyNumber} onChange={handleChangeVerifyNumber}/>
                        <Button content={"확인"} onClick={handleClickVerifyButton}/>
                    </div>
                    {isVerified === 1 ?  <p className="verifyresulttext" style={{color: `var(--deep-blue-color)`}}>{'인증이 완료되었습니다.'}</p> : 
                    isVerified === 2 ?  <p className="verifyresulttext" style={{color: `var(--orange-color)`}}>{'잘못된 인증번호 입니다. 다시 시도해 주세요 :('}</p> :
                    <p className="verifyresulttext"></p>}
                </div>
                <div className="nextbutton">
                    {isVerified === 1 ? <Button type={'floating'} content={'다음'} onClick={handleClickNextButton} /> :
                    <Button type={'floating disabled'} content={'다음'} />}
                </div>
			</div>
        </div>
    );
};

export default Verification;