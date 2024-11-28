
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './auth-system/login';
import Register from './auth-system/register';
import ForgotPassword from './auth-system/forgot-password';
import ResetPassword from './auth-system/reset-password';
import Home from './home-section/home';
import OTPVerification from './auth-system/otp-verify';
import ResetVerification from './auth-system/reset-verify';
import ProtectedRoute from './auth-system/protectedRoute';
import { Provider } from 'react-redux';
import store from './redux/store.js'
import Inbox from './home-section/Inbox.jsx';
import Trash from './home-section/Trash.jsx';
import Sent from './home-section/sent.jsx';
import Star from './home-section/Star.jsx';
import Draft from './home-section/Draft.jsx';
import { useState } from 'react';
import SingleInbox from './home-section/inbox-page.jsx';
import SingleSent from './home-section/sent-page.jsx';


const App = () => {
  const [search,setSearch] = useState('')
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
    <Route path='/home' element={<ProtectedRoute component={<Home search={search} setSearch={setSearch}/>}/>}>
    <Route index element={<Inbox search={search}/>}></Route>
    <Route path='/home/trash' element={<Trash/>}/>
    <Route path='/home/sent' element={<Sent search={search}/>}/>
    <Route path='/home/starred' element={<Star/>}/>
    <Route path='/home/draft' element={<Draft/>}/>
    <Route path='/home/inbox-page/:id' element={<SingleInbox/>}/>
    <Route path='/home/sent-page/:id' element={<SingleSent/>}/>
    </Route>
    </Routes>
    </BrowserRouter>
    </Provider>
  )
};
export default App;

