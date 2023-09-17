import '../components/Header.scss';

import { useState } from 'react';

import { ReactComponent as Bell } from '../assets/images/bell.svg';
import { ReactComponent as BadgedBell } from '../assets/images/bell-badged.svg';
import { ReactComponent as Logo } from '../assets/images/logo.svg';
import { useNavigate } from 'react-router-dom';

export const MainHeader = () => {

    const [isNewAlarm, setIsNewAlarm] = useState(false); // 새 알람 여부 State

    const navigate = useNavigate();
    
    return (
        <div className="MainHeader">
            <div className='header-left' onClick={() => navigate('/home')}>
                <Logo />
                <div className='headertext'>
                    <p className='univeus'>UNIVE.US</p>
                    <p className='kgu'>KGU</p>
                </div>
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