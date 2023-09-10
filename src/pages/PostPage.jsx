import { SubHeader } from "../components/Header";

import '../pages/PostPage.scss'

import DefaultProfileImg from '../assets/images/default_profile.svg';
import { useState } from "react";
import { GenderSticker } from "../components/MeetingCard";

import MaleIcon from '../assets/images/male.svg';
import FemaleIcon from '../assets/images/female.svg';

import test from '../assets/images/default_image.png'
import Button from "../components/Button";


const PostPage = () => {

    const gender = 2;

    const profile_img = undefined;

    const limit_gender = 2;

    const borderColor = gender === 1 ? '--purple-color' : '--pink-color';

    const [postData, setPostData] = useState({});

    return (
        <div className="PostPage">
            <SubHeader headertext={"우리의 축제 MATE🔥"}/>
            <div className="postpagebody">
                <div className="postpageheader">
                    <div className="writerinfocontainer">
                        <div className='profileimage' style={{border: `2px solid var(${borderColor})`}}>
                            {profile_img ? 
                            <img src={profile_img} alt="" className='userprofileimage'/> :
                            <img src={DefaultProfileImg} alt="" className='defaultprofileimage'/>
                            }
                        </div>
                        <div className="writerinfo">
                            <div className="writer_nickname_and_grade">
                                <p className="nickname">닉네임</p>
                                <div className="vertical_bar"></div>
                                <p className="grade">17학번</p>
                            </div>
                            <div className="posttime">
                                <p className="">09/27 12:13</p>
                            </div>
                        </div>
                    </div>
                    {limit_gender === 1 ? <GenderSticker img={MaleIcon} color={'--purple-color'}/>
                    : limit_gender === 2 ? <GenderSticker img={FemaleIcon} color={'--pink-color'}/>
                    : <></>}
                </div>
                <div className="horizontal_bar"></div>
                <div className="postcontentcontainer">
                    <p className="posttitle">제목을 입력해 주세요</p>
                    <p className="postcontent">어떤 모임을 진행할 예정인가요? 간단하게 작성해 보아요 :) EX) 모임 주제 (바른 프로젝트 팀원을 구합니다.) 원하는 분위기나, 성격 원하는 과, 단과대 자신의 경험 사항(프로젝트, 공모전, 대외활동 등) 모임의 목표</p>
                </div>
                <div className="schedulecontainer">
                    <p className="scheduletitle">일정</p>
                    <div className="scheduleinfocontainer">
                        <div className="datebox">
                            <p>마감일시</p>  
                            <div className="dateinfo">
                                <p className="date">09/26</p>
                                <div className="small_vertical_bar"></div>
                                <p className="time">15:00</p>
                            </div>
                        </div>
                        <div className="datebox">
                            <p>모임일시</p>  
                            <div className="dateinfo">
                                <p className="date">09/27</p>
                                <div className="small_vertical_bar"></div>
                                <p className="time">15:00</p>
                            </div>
                        </div>
                        <div className="textbox">
                            <p>모임장소</p>
                            <p className="meetingplace">5강 벤치앞</p>
                        </div>
                        <div className="textbox">
                            <p>참여인원</p>
                            <p className="meetinglimit">2/<p style={{fontWeight: "var(--semi-bold)"}}>4</p></p>
                        </div>
                    </div>
                </div>
                <div className="postpageimagecontainer">
                    <PostImage imgsrc={test}/>
                    <PostImage />
                    <PostImage />
                    <PostImage />
                </div>
                <div className="horizontal_bar"></div>
                <div className="participantscontainer">
                    <p className="participantcontainertitle">참여 친구</p>
                    <div className="participantlist">
                        <ParticiPant participantGender={1}/>
                    </div>
                </div>
                <Button type={'floating'} content={'참여하기'}/>
            </div>
        </div>
    );
};

export const PostImage = ({ imgsrc }) => {
    return (
        <div className="PostImage">
            <img src={imgsrc} alt="" />
        </div>
    )
};

export const ParticiPant = ({participant_profile_img, participantGender}) => {

    const participantBorderColor = participantGender === 1 ? '--purple-color' : '--pink-color';

    return (
        <div className="Participant">
            <div className="flex-left">
                <div className='participantprofileimage' style={{border: `2px solid var(${participantBorderColor})`}}>
                    {participant_profile_img ? 
                    <img src={participant_profile_img} alt="" className='userprofileimage'/> :
                    <img src={DefaultProfileImg} alt="" className='defaultprofileimage'/>
                    }
                </div>
                <div className="participantinfo">
                    <p className="participantnickname">테스트</p>
                    <p className="participantclass">17학번</p>
                    <p></p>
                </div>
            </div>
            <div className="flex-right">
                <p>참여중</p>
            </div>
        </div>
    )
}

export default PostPage;