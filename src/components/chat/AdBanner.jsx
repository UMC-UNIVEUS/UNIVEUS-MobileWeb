import React from "react";
import styled from "styled-components";
import './AdBanner.css';
import logo from '../../assets/images/pepicons-pop_comet-circlelogo4.png'
const Banner = styled.div`
    padding: 10px 15px;
    background-color: #F0F2FF;
    width: 90%;
    margin: 20px auto;
    display: flex;
    border-radius: 20px;
    justify-content: space-between;
`

const SmallBtn = styled.button`
    background-color: #6E7DFF;
    border-radius: 10px;
    color: white;
    border: none;
    padding: 0 10px;
    font-weight: bold;
    font-size: 13px;
    width: 90px;
    height: 32px;
    margin-top: 3px;
`

export const AdBanner = () => {
    return (
        <Banner>
            <div className="left-banner-side">
                <img src={logo} alt=""/>
            </div>
            <div className="center-banner-side">
                <h2>우리학교 챗 참여하기!</h2>
                <p><span>[경기대학교 수원캠퍼스]</span>(1234 명 참여중)</p>
            </div>
            <SmallBtn>아아 단 한잔</SmallBtn>
        </Banner>
    )
}
