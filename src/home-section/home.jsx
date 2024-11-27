import { Outlet } from "react-router-dom";
import Navbar from "./navbar"
import { userInformations } from "../apis";
import { useEffect, useState} from "react";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { getUserData } from "../redux/userSlice";
import Sidebar from "./side-bar";
import Messanger from "./Messanger";
import Profile from "./profile";

const Home = ()=>{
    const [toggle,setToggle]=useState(false)
    const [open,setOpen] =useState(false)
    const [viewProfile,setViewProfile]=useState(false)
    const dispatch = useDispatch()
    const token = localStorage.getItem('token')
    const decoded = jwtDecode(token)
    const userEmail = decoded.email
    const userInfo = async()=>{
      const data= await userInformations(userEmail)
        dispatch(getUserData(data))
    }
    
    useEffect(()=>{
        userInfo()
    },[])
  
    return(
      <div className="w-full overscroll-none bg-violet-50 h-screen">
        <Navbar setToggle={setToggle} toggle={toggle} 
        setOpen={setOpen} setViewProfile={setViewProfile}/>
        <div className="flex h-4/5 overflow-none w-full">
           <Sidebar toggle={toggle} setOpen={setOpen} setViewProfile={setViewProfile}/>
         <div className="bg-white h-full w-full rounded-2xl"><Outlet/></div> 
        </div>
       {open && <div><Messanger setOpen={setOpen} userEmail={userEmail}/></div>}
       {viewProfile && <div><Profile setViewProfile={setViewProfile} userEmail={userEmail}/></div>}
    </div>
    )
}
export default Home;