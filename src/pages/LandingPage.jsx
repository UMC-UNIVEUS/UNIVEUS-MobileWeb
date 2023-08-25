import '../pages/LandingPage.scss';
import { SubHeader } from '../components/Header'

import { ReactComponent as GoogleIcon } from '../assets/images/google.svg';

const LandingPage = () => {
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
                <div className='loginbutton'>
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