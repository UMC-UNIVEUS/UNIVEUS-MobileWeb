import { SubHeader } from "../components/Header";

import '../pages/PostPage.scss'

import DefaultProfileImg from '../assets/images/default_profile.svg';
import { useEffect, useState } from "react";
import { GenderSticker } from "../components/MeetingCard";

import MaleIcon from '../assets/images/male.svg';
import FemaleIcon from '../assets/images/female.svg';

import test from '../assets/images/default_image.png'
import Button from "../components/Button";
import Modal from "../components/Modal";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";


const PostPage = () => {

    const gender = 2;

    const profile_img = undefined;

    const limit_gender = 2;

    const borderColor = gender === 1 ? '--purple-color' : '--pink-color';

    const jwtToken = sessionStorage.getItem('accessToken');

    const [postData, setPostData] = useState({
        Post: {
            "post_id": "",
            "user_id": "",
            "title": "",
            "category": "",
            "limit_gender": "",
            "content": "",
            "created_at": "",
            "updated_at": "",
            "scrapes": "",
            "location": "",
            "meeting_date": "",
            "end_date": "",
            "current_people": "",
            "limit_people": "",
            "main_img": "",
            "openchat": "",
            "post_status": "",
            "likes": "",
            "hidden": ""
        },
        PostImages: [],
        Participant: []
    });

    

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpen2, setIsModalOpen2] = useState(false);
    const [isModalOpen3, setIsModalOpen3] = useState(false);

    const participantUserIds = postData ? postData.Participant.map(entry => entry.user_id) : [];

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const openModal2 = () => setIsModalOpen2(true);
    const closeModal2 = () => setIsModalOpen2(false);

    const openModal3 = () => setIsModalOpen3(true);
    const closeModal3 = () => setIsModalOpen3(false);

    const [invitee, setInvitee] = useState([]);
	const [inviteeText, setInviteeText] = useState('');

    const handleInvitee = (e) => {
		setInvitee([...invitee, inviteeText]);
	};

    const handleInviteeText = (e) => {
		setInviteeText(e.target.value);
	};

    const { id } = useParams();

    const navigate = useNavigate();


    useEffect(() => {
        axios({
            headers: {
                "x-access-token": jwtToken
            },
            method: 'get',
            url: `https://univeus.site/post/${id}`,
        }).then((response) => {
            if (response.data.code === 3000) {
                navigate('/home');
            }
            setPostData(response.data.result);
        })
    }, []);

    const limit_people = 6;

    function repeatInvitee(limit_people) {
		let arr = [];
		for (let i = 0; i < limit_people / 2 - 1; i++) {
			arr.push(
				<input
					type="text"
					className="cfi-input"
					id={i}
					placeholder="친구의 닉네임을 입력해주세요"
					required
					onChange={handleInviteeText}
					onBlur={handleInvitee}
					key={i}
				/>
			);
		}
		return arr;
	}

    const handleClickInviteButton = () => {
        axios({
            headers: {
                "x-access-token": jwtToken
            },
            method: 'post',
            url: `https://univeus.site/post/${postData.Post.post_id}/participant`,
            data: {
                user_id : postData.Post.user_id,
                participant_userIDsFromDB: participantUserIds,
                invited_userNickNamesFromAPI: invitee
            }
        }).then((response) => {
            console.log(response);
            closeModal();
            openModal2();
        })
    };


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
                    <p className="posttitle">{postData ? postData.Post.title : ""}</p>
                    <p className="postcontent">{postData ? postData.Post.content : ""}</p>
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
                            <p className="meetingplace">{postData ? postData.Post.location : ""}</p>
                        </div>
                        <div className="textbox">
                            <p>참여인원</p>
                            <p className="meetinglimit">{postData ? postData.Post.current_people : ""}/<p style={{fontWeight: "var(--semi-bold)"}}>{postData ? postData.Post.limit_people : ""}</p></p>
                        </div>
                    </div>
                </div>
                <div className="postpageimagecontainer">
                    {postData ? postData.PostImages.map((it) => (
                        <PostImage imgsrc={it.img_url}/>
                    )) : <></>}
                </div>
                <div className="horizontal_bar"></div>
                <div className="participantscontainer">
                    <p className="participantcontainertitle">참여 친구</p>
                    <div className="participantlist">
                        {postData ? postData.Participant.map((it, idx) => (
                            <ParticiPant {...it} key={idx}/>
                        )) : <></>} 
                    </div>
                </div>
                <Button type={'floating'} content={'참여하기'} onClick={openModal}/>
                <Modal isOpen={isModalOpen} closeModal={closeModal} title={'함께 하는 친구를 초대해 주세요!'}>
                    <div className="inviteelist">
                        {repeatInvitee(postData ? postData.Post.limit_people : 0)}
                    </div>
                    <Button content={"초대하기"} onClick={handleClickInviteButton}/>
                </Modal>
                <Modal isOpen={isModalOpen2} closeModal={closeModal2} title={"참가 신청이 완료되었어요 :)"}>
                    <div className="completecontainer">
                        <p>모임 소통을 위해 오픈채팅방에 꼭 입장해 주세요.</p>
                        <p style={{fontWeight: "600", marginTop: "3px"}}>문자로 모임내용이 발송되니 꼭 확인해주세요!</p>
                    </div>
                    <div className="modalbuttoncontainer">
                        <button className="laterbutton" onClick={closeModal2}><span>나중에 할게요.</span></button>
                        <Button content={"지금 입장할래요!"} onClick={() => {window.location.href = postData ? postData.Post.openchat : ""}}/>
                    </div>
                </Modal>
                <Modal isOpen={isModalOpen3} closeModal={closeModal3} title={"참여를 취소하시겠습니까?"}>
                    <div className="completecontainer">
                        <p>잦은 참여 취소는 패널티의 원인이 될 수 있어요 :(</p>
                        <p style={{fontWeight: "600", marginTop: "3px"}}>모임 리더에게 취소 의사를 명확하게 말씀해 주세요!</p>
                    </div>
                    <div className="modalbuttoncontainer">
                        <button className="yesnobutton" onClick={closeModal3}><span>아니오</span></button>
                        <button className="yesnobutton" style={{background: "var(--deep-blue-color)", color: "white"}}><span>네</span></button>
                    </div>
                </Modal>
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

export const ParticiPant = ({profile_img, gender, nickname, class_of}) => {

    const participantBorderColor = gender === 1 ? '--purple-color' : '--pink-color';
    const classNum = class_of.substring(2, 4);

    return (
        <div className="Participant">
            <div className="flex-left">
                <div className='participantprofileimage' style={{border: `2px solid var(${participantBorderColor})`}}>
                    {profile_img ? 
                    <img src={profile_img} alt="" className='userprofileimage'/> :
                    <img src={DefaultProfileImg} alt="" className='defaultprofileimage'/>
                    }
                </div>
                <div className="participantinfo">
                    <p className="participantnickname">{nickname}</p>
                    <p className="participantclass">{classNum}학번</p>
                </div>
            </div>
            <div className="flex-right">
                <p>참여중</p>
            </div>
        </div>
    )
}

export default PostPage;