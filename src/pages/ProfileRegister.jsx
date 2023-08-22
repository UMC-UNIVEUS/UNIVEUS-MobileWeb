import Button from "../components/Button";
import { SubHeader } from "../components/Header";
import { useState } from "react";
import axios from "axios";

import '../pages/ProfileRegister.scss';

const ProfileRegister = () => {

    const [isOverlap, setIsOverlap] = useState(0); // 초기 상태 0, 중복 안 됨 1, 중복됨 2
    const [nickname, setNickname] = useState('');
    const [gender, setGender] = useState(0); // 초기 상태 0, 남성 1, 여성 2

    const handleChangeNickname = (e) => {
        setNickname(e.target.value);
    };

    const handleClickOverlapButton = () => {
        axios({
            method: "post",
            url: "https://univeus.site/user/nickname/check",
            data: { 
                nickname : nickname
            },
        }).then((res) => {
            if (res.data.isSuccess === true) {
                setIsOverlap(1);
            } else {
                setIsOverlap(2);
            }
        });
    };

    const handleClickMaleInput = () => {
        setGender(1);
    };

    const handleClickFemaleInput = () => {
        setGender(2);
    };

    return (
        <div className="ProfileRegister">
            <SubHeader headertext={'프로필 등록'}/>
            <div className="profileregisterbody">
                <div className="nicknameinputcontainer">
                    <p className="inputtitle">닉네임</p>
                    <div className="inputcontainer">
                        <input type="text" className="nicknameinput" placeholder="닉네임을 입력해주세요" value={nickname} onChange={handleChangeNickname}/>
                        <Button content={"중복확인"} onClick={handleClickOverlapButton} />
                    </div>
                    {isOverlap === 1 ?  <p className="overlapresulttext" style={{color: `var(--deep-blue-color)`}}>{'사용가능한 닉네임입니다 :)'}</p> : 
                    isOverlap === 2 ?  <p className="overlapresulttext" style={{color: `var(--orange-color)`}}>{'이미 사용중인 닉네임입니다 :('}</p> :
                    <p className="overlapresulttext"></p>}
                </div>
                <div className="genderinputcontainer">
                    <p className="inputtitle">성별</p>
                    <div className="checkboxcontainer">
                        <div className="malecheckbox">
                            <input type="radio" name="check" onClick={handleClickMaleInput}/>
                            <p className="gendertype">남</p>
                        </div>
                        <div className="femalecheckbox">
                            <input type="radio" name="check" onClick={handleClickFemaleInput}/>
                            <p className="gendertype">여</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default ProfileRegister;