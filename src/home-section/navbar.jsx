import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getAllData } from "../apis";
import { jwtDecode } from "jwt-decode";

const Navbar = ({setToggle,toggle,setViewProfile,setOpen}) =>{
    const userInfo = useSelector((state)=> state.users.userData)
    const [searchUsers,setSearchUsers]=useState([])
    const [search,setsearch]=useState('')
    const token = localStorage.getItem('token')
    const decoded = jwtDecode(token)
    const user_Name = decoded.userName
    const getAllUsers=async(e)=>{
        setsearch(e.target.value)
      const data = await getAllData()
      const filerItems = data.filter((user)=> search =='' ? [] :
       user.user_name.includes(search))
       setSearchUsers(filerItems)
    }
  function toggling(){
    if(toggle){
        setToggle(false)
    }else{
        setToggle(true)
    }
  }
  function displayProfile(){
        setOpen(false)
        setViewProfile(true)
  }
    return(
        <nav className="select-none h-16 bg-violet-50 flex items-center justify-between gap-2 font-reem  w-full top-0 left-0 z-10">
             <div className="flex gap-1 items-center">
<div onClick={toggling} className="p-3 ml-2 hover:bg-slate-200 rounded-full">
                <div className="w-5 border border-black mb-1"></div>
                <div className="w-5 border border-black mb-1"></div>
                <div className="w-5 border border-black mb-1"></div>
             </div>
             <img className="max-md:hidden" src="https://ssl.gstatic.com/ui/v1/icons/mail/rfr/logo_gmail_lockup_default_1x_r5.png"></img>
             </div>
             
            <label className="relative bg-indigo-100 h-12 w-4/5  max-w-3xl flex items-center
            gap-4 rounded-full  ml-2">
            <i className="fa-solid fa-magnifying-glass pl-2 text-slate-800"></i>
            <input type="text" placeholder="Search mail" value={search} onChange={getAllUsers}
             className="bg-inherit placeholder:text-slate-500
             focus:outline-none w-4/5"/>
            <ul className={`w-full top-10 absolute bg-white top-0 shadow-md rounded   ${search ? 'block' : 'hidden'} `}>
            {searchUsers.map((user)=>(
                <Link to={`/profile/${user.user_name}`} key={user.email}>
                <li className="p-2 flex gap-2 items-center" >
                        <img src={user.profile} className="h-10 w-10 rounded-full object-cover"/>
                        <div>
                        <p>{user.user_name}</p>
                        <p className="font-bold italic">{user.name}</p>
                        </div>
                    </li>
                </Link>
                    
            ))}
            </ul>
            </label>
            <div onClick={displayProfile} className="flex gap-2 items-center mr-2">
            <img  src={userInfo.profile} className="h-9 w-9  flex-none  rounded-full object-cover bg-white cursor-pointer"></img>
            </div>
            
        </nav>
    )
}
export default Navbar;
