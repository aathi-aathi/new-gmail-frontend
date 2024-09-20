import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Navbar = () =>{
    const userInfo = useSelector((state)=> state.users.userData)
   const navigate = useNavigate()
    return(
        <nav className="h-16 bg-gradient-to-r from-sky-200 to-indigo-300 flex items-center justify-between gap-2  fixed w-full top-0 left-0 z-10">
            <img src='https://cdn-icons-png.flaticon.com/128/3698/3698710.png' className="h-10 w-10 ml-2 hidden md:block rounded-full object-contain bg-white cursor-pointer"></img>
            <label className="bg-white h-10 w-4/5 max-w-96 flex items-center gap-4 rounded-full border border-blue-400 ml-2">
            <i className="fa-solid fa-magnifying-glass pl-2 text-blue-500"></i>
            <input type="text" placeholder="Search..." className="focus:outline-none w-4/5"/>
            </label>
            <img src={userInfo.profile} className="h-10 w-10 mr-2  rounded-full object-cover bg-white cursor-pointer" onClick={()=>navigate('/profile')}></img>
        </nav>
    )
}
export default Navbar;
