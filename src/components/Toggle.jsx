import './Toggle.scss';
import { useState } from 'react';

// 토글이 켜있을 때는 true, 꺼질떄는 false
/* <Toggle toggle={true} /> */

export default function Toggel({ toggle }) {
	const [isOn, setisOn] = useState(toggle);

	const toggleHandler = () => {
		isOn ? setisOn(false) : setisOn(true);
	};

	return (
		<div className="toggle">
			<div className="toggle-body" onClick={toggleHandler}>
				<div className={`toggle-container ${isOn ? 'toggle--checked' : ''}`} />
				<div className={`toggle-circle ${isOn ? 'toggle--checked' : ''}`} />
			</div>
		</div>
	);
}
