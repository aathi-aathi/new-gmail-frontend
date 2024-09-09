import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Navbar = () =>{
    const userInfo = useSelector((state)=> state.users.userData)
   const navigate = useNavigate()
    return(
        <nav className="h-16 bg-slate-200 flex items-center justify-between gap-2">
            <h1 className="text-2xl ml-4 font-black text-blue-500 hidden md:block">Shopify</h1>
            <label className="bg-white h-10 w-4/5 max-w-96 flex items-center gap-4 rounded-full border border-blue-400 ml-2">
            <i className="fa-solid fa-magnifying-glass pl-2 text-blue-500"></i>
            <input type="text" placeholder="Search..." className="focus:outline-none w-4/5"/>
            </label>
            <img src={userInfo.profile} className="h-10 w-10 mr-2  rounded-full object-contain bg-white cursor-pointer" onClick={()=>navigate('/profile')}></img>
        </nav>
    )
}
export default Navbar;
