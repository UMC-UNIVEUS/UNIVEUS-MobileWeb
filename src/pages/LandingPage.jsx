import '../pages/LandingPage.scss';
import { SubHeader } from '../components/Header'

import { ReactComponent as GoogleIcon } from '../assets/images/google.svg';

import {useGoogleLogin} from "@react-oauth/google";

import { useDispatch } from 'react-redux';

import axios from 'axios';

import { useNavigate } from 'react-router-dom';

const LandingPage = () => {

    const navigate = useNavigate();
    

    // 소셜로그인 코드

    const googleSocialLogin = useGoogleLogin({
        onSuccess: (codeResponse) => {
            axios({
                method: "post",
                url: "https://univeus.site/user/nickname/login",
                data: { 
                    accessToken: codeResponse.code
                },
            })
            .then(function (response) {
                console.log(response);
                if (response.isSuccess === true) {
                    dispatch(updateToken(response.result.accessToken));
                    navigate('/verification');
                }
            })
        },
        flow: 'auth-code',
    });

    // const googleSocialLogin = useGoogleLogin({
    //     onSuccess: (codeResponse) => console.log(codeResponse),
    //     flow: 'auth-code'
    // });

    const updateToken = (jwtToken) => {
        return {
          type: 'UPDATE_TOKEN',
          jwtToken
        };
    };

    const dispatch = useDispatch();

    return (
        <div className="LandingPage">
            <SubHeader headertext={"회원가입•간편로그인"}/>
            <div className='landingpagebody'>
                <div className='bannercontainer'>
                    <div className='bannerfirstrow'>
                        <LandingPageBanner bannertext={"축제 메이트"} textcolor={'--skyblue-color'} />
                        <LandingPageBanner bannertext={"프로젝트"} textcolor={'--deep-blue-color'} />
                        <LandingPageBanner bannertext={"공모전"} textcolor={'--deep-gray-color'} />
                    </div>
                    <div className='bannersecondrow'>
                        <LandingPageBanner bannertext={"대외활동"} textcolor={'--deep-blue-color'} />
                        <LandingPageBanner bannertext={"밥MATE"} textcolor={'--deep-gray-color'} />
                        <LandingPageBanner bannertext={"술MATE"} textcolor={'--skyblue-color'} />
                    </div>
                    <div className='bannerthirdrow'>
                        <LandingPageBanner bannertext={"맛집 탐방"} textcolor={'--deep-gray-color'} />
                        <LandingPageBanner bannertext={"팀원구인"} textcolor={'--skyblue-color'} />
                        <LandingPageBanner bannertext={"공부 MATE"} textcolor={'--deep-blue-color'} />
                    </div>
                </div>
                <div className='titlecontainer'>
                    <p className='titletext'>우리 학교 <span style={{color: 'var(--deep-blue-color)', fontWeight: 'var(--bold)'}}>MATE</span>가 필요할 때</p>
                    <p className='univeustext'>UNIVE.US</p>
                </div>
                    <div className='loginbutton' onClick={googleSocialLogin}>
                        <GoogleIcon className='googleicon'/>
                        <p>구글 소셜로그인</p>
                    </div>
            </div>
        </div>
    )
};

export const LandingPageBanner = ({ bannertext, textcolor }) => {
    return (
        <div className='LandingPageBanner'>
            <p className='bannertext' style={{color: `var(${textcolor})`}}>{bannertext}</p>
        </div>
    )
};

export default LandingPage;