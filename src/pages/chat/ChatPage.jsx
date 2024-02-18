import React, {useEffect, useState} from "react";
import {MainHeader} from "../../components/Header";
import NavBar from "../../components/NavBar";
import styled from "styled-components";
import {AdBanner} from "../../components/chat/AdBanner";
import "./ChatPage.css";
import {Room} from "../../components/chat/Room";
import noChat from '../../assets/images/chat/no-uni-chat.png'
const ChatBody = styled.div`
    padding-top: 52px;
    padding-bottom: 71px;
    margin: 0 auto;
    //background-color: red;
    height: 100%;
    display: flex;

    
`

const Notice = styled.div`
    background-color: #F3F3F3;
    padding: 5px 10px;
    width: 250px;
    border-radius: 20px;
    text-align: center;
    margin: 15px auto 0 auto;
    font-size: 10px;
`

export default function ChatPage() {
    const [roomList, setRoomList] = useState([]);
    useEffect(() => {
        // TODO : Fetch chat list data and update state
    }, []);
    return (
        <>
            <MainHeader displaySearchIcon="false" displayAlarm="true" displayMenu="false" headerTitle="유니버스 소통하기"/>
            <ChatBody>
                <div className="chat-list-wrap">
                    <Notice>
                        일주일간 소통이 없을 경우 자동 삭제됩니다 :)
                    </Notice>
                    <AdBanner />
                    <div className="room-list">
                        {
                            roomList.length > 0 ? roomList.map((value,index) => {
                                return <Room key={index} data={value} />;
                            }) : [
                                <div className="no-room">
                                    <img className="no-chat-img" src={noChat} alt=""/>,
                                    <p>참여된 유니버스가 없습니다.</p>,
                                </div>
                            ]
                        }
                    </div>
                </div>
            </ChatBody>
            <NavBar present={'chat'}/>
        </>
    )
}