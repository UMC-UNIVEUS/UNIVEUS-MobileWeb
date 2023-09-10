import '../components/MeetingCard.scss';

import MaleIcon from '../assets/images/male.svg';
import FemaleIcon from '../assets/images/female.svg';
import PeopleIcon from '../assets/images/people_black.svg'
import DefaultProfileImg from '../assets/images/default_profile.svg';
import DefaultBackgroundImg from '../assets/images/default_image.png';

import { ReactComponent as Calendar } from '../assets/images/calendar.svg';
import { ReactComponent as Map } from '../assets/images/map.svg';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const MeetingCard = ({ post_id, main_img, gender, limit_gender, current_people, limit_people, profile_img, title, meeting_date, location }) => {

    const maxLength = 24;
    const truncatedTitle = title.length > maxLength ? title.substring(0, maxLength) + '...' : title;
    const borderColor = gender === 1 ? '--purple-color' : '--pink-color';

    
    const navigate = useNavigate();

    const jwtToken = sessionStorage.getItem('accessToken');

    const handleClickMeetingCard = () => {
        navigate(`/post/${post_id}`);
    }

    return (
        <div className="MeetingCard" onClick={handleClickMeetingCard}>
            <div className='profileimage' style={{border: `1px solid var(${borderColor})`}}>
                {profile_img ? 
                <img src={profile_img} alt="" className='userprofileimage'/> :
                <img src={DefaultProfileImg} alt="" className='defaultprofileimage'/>
                }
            </div>
            <div className='meetingcardimagecontainer'>
                {main_img === "0" ? 
                <img src={DefaultBackgroundImg} alt="" className='meetingimage'/>:
                <img src={main_img} alt="" className='meetingimage'/>
                }
                {limit_gender === 1 ? <GenderSticker img={MaleIcon} color={'--purple-color'}/>
                : limit_gender === 2 ? <GenderSticker img={FemaleIcon} color={'--pink-color'}/>
                : <></>}
                <div className='participant'>
                    <img src={PeopleIcon} alt="" className='peopleicon' />
                    <p>{current_people}/{limit_people}</p>
                </div>
            </div>
            <div className='meetingcardinfocontainer'>
                <p className='meetingtitle'>{truncatedTitle}</p>
                <div className='meetinginfo'>
                    <div className='meetingtime'>
                        <Calendar />
                        <p className='infotext'>{meeting_date}</p>
                    </div>
                    <div className='meetingplace'>
                        <Map />
                        <p className='infotext'>{location}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MeetingCard;

export const GenderSticker = ({ img, color }) => {
    return (
        <div className='GenderSticker' style={{backgroundColor: `var(${color})`}}>
            <img src={img} alt="" />
            <p className='onlytext'>ONLY</p>
        </div>
    );
};