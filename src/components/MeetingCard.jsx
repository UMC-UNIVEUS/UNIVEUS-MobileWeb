import '../components/MeetingCard.scss';

import MaleIcon from '../assets/images/male.svg';
import FemaleIcon from '../assets/images/female.svg';
import PeopleIcon from '../assets/images/people_black.svg'
import DefaultProfileImg from '../assets/images/default_profile.svg';

import { ReactComponent as Calendar } from '../assets/images/calendar.svg';
import { ReactComponent as Map } from '../assets/images/map.svg';

const MeetingCard = ({ meetingimg, gender, partnergender, nowpeople, limitpeople, profileimg, meetingtitle, meetingtime, meetingplace }) => {

    const maxLength = 26;
    const truncatedTitle = meetingtitle.length > maxLength ? meetingtitle.substring(0, maxLength) + '...' : meetingtitle;
    const borderColor = gender === 1 ? '--purple-color' : '--pink-color';

    return (
        <div className="MeetingCard">
            <div className='profileimage' style={{border: `1px solid var(${borderColor})`}}>
                {profileimg ? 
                <img src={profileimg} alt="" className='userprofileimage'/> :
                <img src={DefaultProfileImg} alt="" className='defaultprofileimage'/>
                }
            </div>
            <div className='meetingcardimagecontainer'>
                <img src={meetingimg} alt="" className='meetingimage'/>
                {partnergender === 1 ? <GenderSticker img={MaleIcon} color={'--purple-color'}/>
                : partnergender === 2 ? <GenderSticker img={FemaleIcon} color={'--pink-color'}/>
                : <></>}
                <div className='participant'>
                    <img src={PeopleIcon} alt="" className='peopleicon' />
                    <p>{nowpeople}/{limitpeople}</p>
                </div>
            </div>
            <div className='meetingcardinfocontainer'>
                <p className='meetingtitle'>{truncatedTitle}</p>
                <div className='meetinginfo'>
                    <div className='meetingtime'>
                        <Calendar />
                        <p className='infotext'>{meetingtime}</p>
                    </div>
                    <div className='meetingplace'>
                        <Map />
                        <p className='infotext'>{meetingplace}</p>
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