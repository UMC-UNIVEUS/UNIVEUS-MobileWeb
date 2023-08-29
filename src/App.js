import { Reset } from 'styled-reset';
import './App.scss';
import HomePage from './pages/HomePage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Verification from './pages/Verification';
import ProfileRegister from './pages/ProfileRegister';
import LandingPage from './pages/LandingPage';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { clientId } from './utils/GoogleLoginData';


function App() {
	return (
		<div className="App">
			<GoogleOAuthProvider clientId={`${clientId}`}>
				<BrowserRouter>
					<Routes>
						<Route path='/' element={<LandingPage />}/>
						<Route path='/verification' element={<Verification />}/>
						<Route path='/register' element={<ProfileRegister />}/>
					</Routes>
				</BrowserRouter>
			</GoogleOAuthProvider>
			<Reset />
		</div>
	);
}

export default App;
