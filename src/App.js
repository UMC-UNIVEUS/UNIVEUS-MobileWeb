import { Reset } from 'styled-reset';
import ModalTest from './components/ModalTest';
import Button from './components/Button';
import './App.scss';

function App() {
	return (
		<div className="App">
			<Reset />
			<ModalTest />
			<Button type={'floating'} content={'스터디'} />
		</div>
	);
}

export default App;
