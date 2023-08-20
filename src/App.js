import { Reset } from 'styled-reset';
import './App.scss';
import Test from './pages/Test';
import NavBar from './components/NavBar';

function App() {
	return (
		<div className="App">
			<Reset />
			<Test />
			<NavBar />
		</div>
	);
}

export default App;
