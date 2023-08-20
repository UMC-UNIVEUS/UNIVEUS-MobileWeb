import ModalTest from '../components/ModalTest';
import Button from '../components/Button';

export default function Test() {
	return (
		<div style={{ margin: '0 20px' }}>
			<ModalTest />
			<Button type={'floating'} content={'스터디'} />
		</div>
	);
}
