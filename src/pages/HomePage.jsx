import Button from "../components/Button";
import { MainHeader } from "../components/Header";
import MeetingCard from "../components/MeetingCard";
import NavBar from "../components/NavBar";
import SlideBanner from "../components/SlideBanner";

import '../pages/HomePage.scss';

const DummyMeetingList = [
    {
        gender: 1,
        partnergender: 2,
        nowpeople: 2,
        limitpeople: 4,
        meetingtitle: "테스트 1",
        meetingtime: "8월 14일 15:00",
        meetingplace: "25번 주점 앞에서",
    },
    {
        gender: 2,
        partnergender: 1,
        nowpeople: 3,
        limitpeople: 6,
        meetingtitle: "테스트 2",
        meetingtime: "8월 15일 15:00",
        meetingplace: "도서관 앞"
    },
    {
        gender: 2,
        partnergender: 1,
        nowpeople: 6,
        limitpeople: 6,
        meetingtitle: "테스트 3",
        meetingtime: "8월 17일 12:00",
        meetingplace: "광교호수공원"
    },
    {
        gender: 1,
        partnergender: 2,
        nowpeople: 4,
        limitpeople: 4,
        meetingtitle: "테스트 4",
        meetingtime: "8월 16일 21:00",
        meetingplace: "텔레컨벤션센터 앞"
    },
    {
        gender: 1,
        partnergender: 2,
        nowpeople: 0,
        limitpeople: 4,
        meetingtitle: "테스트 5",
        meetingtime: "8월 14일 15:00",
        meetingplace: "25번 주점 앞에서"
    },
    {
        gender: 2,
        partnergender: 1,
        nowpeople: 6,
        limitpeople: 6,
        meetingtitle: "테스트 6",
        meetingtime: "8월 14일 15:00",
        meetingplace: "25번 주점 앞에서"
    },
    {
        gender: 1,
        partnergender: 2,
        nowpeople: 2,
        limitpeople: 4,
        meetingtitle: "테스트 1",
        meetingtime: "8월 14일 15:00",
        meetingplace: "25번 주점 앞에서"
    },
    {
        gender: 1,
        partnergender: 2,
        nowpeople: 2,
        limitpeople: 4,
        meetingtitle: "테스트 1",
        meetingtime: "8월 14일 15:00",
        meetingplace: "25번 주점 앞에서"
    },
    {
        gender: 1,
        partnergender: 2,
        nowpeople: 2,
        limitpeople: 4,
        meetingtitle: "테스트 1",
        meetingtime: "8월 14일 15:00",
        meetingplace: "25번 주점 앞에서"
    },
    {
        gender: 1,
        partnergender: 2,
        nowpeople: 2,
        limitpeople: 4,
        meetingtitle: "테스트 1",
        meetingtime: "8월 14일 15:00",
        meetingplace: "25번 주점 앞에서"
    }
];

const HomePage = () => {
    return (
        <div className="HomePage">
            <MainHeader />
            <SlideBanner />
            <div className="homepagebody">
                <div className="matesticker">
                    우리의 축제 MATE🔥
                </div>
                <div className="meetingcardcontainer">
                    {DummyMeetingList.map((meeting) => (
                        <MeetingCard {...meeting}/>
                    ))}
                </div>
                <Button className="startbutton" content={"유니버스 생성하기"} type={"floating"} />
            </div>
            <NavBar />
        </div>
    );
};

export default HomePage;