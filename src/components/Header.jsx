import '../components/Header.scss';

import { useState } from 'react';

import { ReactComponent as Bell } from '../assets/images/bell.svg';
import { ReactComponent as BadgedBell } from '../assets/images/bell-badged.svg';

export const MainHeader = () => {

    const [isNewAlarm, setIsNewAlarm] = useState(false); // 새 알람 여부 State

    return (
        <div className="MainHeader">
            <div className='header-left'>
                <p className='univeus'>UNIVE.US</p>
                <div className='graybar'></div>
                <p className='kgu'>KGU</p>
            </div>
            <div className='header-right'>
                {isNewAlarm === false ? 
                    <Bell className='bell-img'/> :
                    <BadgedBell className='badged-bell-img' />
                }
            </div>
        </div>
    );
};

export const SubHeader = ({ headertext }) => {

    return (
        <div className="SubHeader">
            <div className='headertext'>
                {headertext}
            </div>
        </div>
    );
};