import { Reset } from 'styled-reset';
import './App.scss';
import HomePage from './pages/HomePage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Verification from './pages/Verification';
import ProfileRegister from './pages/ProfileRegister';
import LandingPage from './pages/LandingPage';
import SearchPage from './pages/SearchPage';
import PostPage from './pages/PostPage';
import TestPage from './pages/Test';
import MyFeed from './pages/MyFeed';
import CreateDetail from './pages/CreateDetail';
import ModifyDetail from './pages/ModifyDetail';
import ModifyIntro from './pages/ModifyIntro';
import CreateIntro from './pages/CreateIntro';
import IdentityVerification from './pages/IdentityVerification';
import TermsOfUse from './pages/TermsOfUse';

function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<Routes>
					<Route path="/test" element={<TestPage />} />
					<Route path="/" element={<LandingPage />} />
					<Route path="/verification" element={<Verification />} />
					<Route path="/signup/identity" element={<IdentityVerification />} />
					<Route path="/signup/terms-of-use" element={<TermsOfUse />} />
					<Route path="/register" element={<ProfileRegister />} />
					<Route path="/home" element={<HomePage />} />
					<Route path="/search" element={<SearchPage />} />
					<Route path="/post/:id" element={<PostPage />} />
					<Route path="/myunive" element={<MyFeed />} />
					<Route path="/create/detail" element={<CreateDetail />} />
					<Route path="/create/intro" element={<CreateIntro />} />
					<Route path="/modify/detail/:id" element={<ModifyDetail />} />
					<Route path="/modify/intro/:id" element={<ModifyIntro />} />
					<Route path="/chat" />
				</Routes>
			</BrowserRouter>
			<Reset />
		</div>
	);
}

export default App;
