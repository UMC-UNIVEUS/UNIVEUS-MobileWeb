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
import RegistrationOfAffiliation from './pages/RegistrationOfAffiliation';
import RegisterProfile from './pages/RegisterProfile';
import CreatePostLevel1 from './pages/CreatePostLevel1';
import CreatePostLevel2 from './pages/CreatePostLevel2';
import ProfileChange from './pages/ProfileChange';
import SelfIntroduction from './pages/SelfIntroduction';
import SelfIntroductionEdit from './pages/SelfIntroductionEdit';
import OtherUserProfile from './pages/OtherUserProfile';
import CreatePostLevel3 from './pages/CreatePostLevel3';
import MyPage from './pages/MyPage';
import Setting from './pages/Setting';
import UnivePost from './pages/UnivePost';
import Home from './pages/Home';
import Loading from './pages/Loading';

function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<Routes>
					<Route path="/test" element={<TestPage />} />
					<Route path="/loading" element={<Loading />} />
					<Route path="/" element={<LandingPage />} />
					{/* <Route path="/verification" element={<Verification />} /> */}
					<Route path="/signup/identity" element={<IdentityVerification />} />
					<Route path="/signup/terms-of-use" element={<TermsOfUse />} />
					<Route path="/signup/registration-of-affiliation" element={<RegistrationOfAffiliation />} />
					<Route path="/signup/register-profile" element={<RegisterProfile />} />
					{/* <Route path="/register" element={<ProfileRegister />} /> */}
					{/* <Route path="/home" element={<HomePage />} /> */}
					<Route path="/home" element={<Home />} />
					<Route path="/search" element={<SearchPage />} />
					{/* <Route path="/post/:id" element={<PostPage />} /> */}
					<Route path="/post" element={<UnivePost />} />
					<Route path="/mypage" element={<MyPage />} />
					<Route path="/mypage/setting" element={<Setting />} />
					<Route path="/create/post-level1" element={<CreatePostLevel1 />} />
					<Route path="/create/post-level2" element={<CreatePostLevel2 />} />
					<Route path="/create/post-level3" element={<CreatePostLevel3 />} />
					{/* <Route path="/create/detail" element={<CreateDetail />} /> */}
					{/* <Route path="/create/intro" element={<CreateIntro />} /> */}
					{/* <Route path="/modify/detail/:id" element={<ModifyDetail />} /> */}
					{/* <Route path="/modify/intro/:id" element={<ModifyIntro />} /> */}
					<Route path="/profile/change" element={<ProfileChange />} />
					<Route path="/profile/self-introduction" element={<SelfIntroduction />} />
					<Route path="/profile/self-introduction-edit" element={<SelfIntroductionEdit />} />
					<Route path="/profile/other-user-profile" element={<OtherUserProfile />} />
					<Route path="/chat" />
				</Routes>
			</BrowserRouter>
			<Reset />
		</div>
	);
}

export default App;
