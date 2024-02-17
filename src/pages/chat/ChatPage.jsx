import React from "react";
import {MainHeader} from "../../components/Header";
import NavBar from "../../components/NavBar";
import styled from "styled-components";

const ChatBody = styled.div`
    padding-top: 52px;
    padding-bottom: 71px;
    margin: 0 auto;
    //background-color: red;
    height: 100%;
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
    return (
        <>
            <MainHeader displaySearchIcon="false" displayAlarm="true" displayMenu="false" headerTitle="유니버스 소통하기"/>
            <ChatBody>
                <Notice>
                    일주일간 소통이 없을 경우 자동 삭제됩니다 :)
                </Notice>
            </ChatBody>
            <NavBar present={'chat'} />
        </>
    )
}