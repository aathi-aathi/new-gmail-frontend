
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './auth-system/login';
import Register from './auth-system/register';
import ForgotPassword from './auth-system/forgot-password';
import ResetPassword from './auth-system/reset-password';
import Home from './home-section/home';
import OTPVerification from './auth-system/otp-verify';
import ResetVerification from './auth-system/reset-verify';
import Profile from './home-section/profile';
import ProtectedRoute from './auth-system/protectedRoute';
import { Provider } from 'react-redux';
import store from './redux/store.js'
import MessageUI from './home-section/msg-ui.jsx';
import ChatBox from './home-section/chat-box.jsx';
import FollowRequest from './home-section/follow.jsx';


const App = () => {
  return(
    <Provider store={store}>
    <BrowserRouter>
    <Routes>
    <Route path='/login' element={<Login/>}/>
    <Route path='/' element={<Register/>}/>
    <Route path='/forgot-password' element={<ForgotPassword/>}/>
    <Route path='/reset-password/:token' element={<ResetPassword/>}/>
    <Route path='/otp-verify/:token' element={<OTPVerification/>}/>
    <Route path='/reset-verify/:token' element={<ResetVerification/>}/>
    <Route path='/profile/:userName' element={<ProtectedRoute component={<Profile/>}/>}/>
    <Route path='/follow-request' element={<FollowRequest/>}/>
    <Route path='/chat-box/:userName' element={<ChatBox/>}/>
    <Route path='/home' element={<ProtectedRoute component={<Home/>}/>}>
    <Route index element={<MessageUI/>}></Route>
    </Route>
    </Routes>
    </BrowserRouter>
    </Provider>
  )
};
export default App;

