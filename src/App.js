import { Reset } from 'styled-reset';
import './App.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import SearchPage from './pages/SearchPage';
import TestPage from './pages/Test';
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
import ModifyPostLevel1 from './pages/ModifyPostLevel1';
import ModifyPostLevel2 from './pages/ModifyPostLevel2';
import ModifyPostLevel3 from './pages/ModifyPostLevel3';
import {useDispatch} from "react-redux";
import {checkDevMode} from "./feature/auth/authSlice";
import ChatPage from "./pages/chat/ChatPage";

function App() {
	const dispatch = useDispatch();
	dispatch(checkDevMode())
	return (
		<div className="App">
			<BrowserRouter>
				<Routes>
					<Route path="/test" element={<TestPage />} />
					<Route path="/home" element={<Home />} />
					<Route path="/search" element={<SearchPage />} />
					{/* 로그인 및 회원가입 */}
					<Route path="/" element={<LandingPage />} />
					<Route path="/loading" element={<Loading />} />
					<Route path="/signup/identity" element={<IdentityVerification />} />
					<Route path="/signup/terms-of-use" element={<TermsOfUse />} />
					<Route path="/signup/registration-of-affiliation" element={<RegistrationOfAffiliation />} />
					<Route path="/signup/register-profile" element={<RegisterProfile />} />
					{/* 게시글 작성 및 수정, 게시글 */}
					<Route path="/post/:id" element={<UnivePost />} />
					<Route path="/create/post-level1" element={<CreatePostLevel1 />} />
					<Route path="/create/post-level2" element={<CreatePostLevel2 />} />
					<Route path="/create/post-level3" element={<CreatePostLevel3 />} />
					<Route path="/modify/post-level1/:id" element={<ModifyPostLevel1 />} />
					<Route path="/modify/post-level2/:id" element={<ModifyPostLevel2 />} />
					<Route path="/modify/post-level3/:id" element={<ModifyPostLevel3 />} />
					{/* 마이 페이지 관련 */}
					<Route path="/mypage" element={<MyPage />} />
					<Route path="/mypage/setting" element={<Setting />} />
					<Route path="/profile/change" element={<ProfileChange />} />
					<Route path="/profile/self-introduction" element={<SelfIntroduction />} />
					<Route path="/profile/self-introduction-edit" element={<SelfIntroductionEdit />} />
					<Route path="/profile/other-user-profile/:id" element={<OtherUserProfile />} />
					<Route path="/chat" element={<ChatPage />} />
				</Routes>
			</BrowserRouter>
			<Reset />
		</div>
	);
}

export default App;
