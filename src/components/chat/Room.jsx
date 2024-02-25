import React from "react";
import "./Room.css";
import noChat from '../../assets/images/chat/no-uni-chat.png'
export const Room = (props) => {
    const onRoomClick = (event) => {
        console.log(event)
    }
    console.log(props)
    return (
        <div className="room-box" key={props.data.chatUrl} onClick={onRoomClick}>
            <div className="left-side-room">
                <img src={noChat} alt=""/>
            </div>
            <div className="right-side-room">
                <h1>{props.data.roomTitle} (14)</h1>
                <p>{props.data.lastText}</p>
            </div>
        </div>
    )
}
