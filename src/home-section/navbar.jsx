import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getAllData } from "../apis";
import { jwtDecode } from "jwt-decode";

const Navbar = () =>{
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
       user.userName.includes(search))
       setSearchUsers(filerItems)
    }

   const navigate = useNavigate()
    return(
        <nav className="select-none h-16 bg-gradient-to-r from-sky-200 to-indigo-300 flex items-center justify-between gap-2  fixed w-full top-0 left-0 z-10">
            <img src='https://cdn-icons-png.flaticon.com/128/3698/3698710.png' className="h-10 w-10 ml-2 hidden md:block rounded-full object-contain bg-white cursor-pointer"></img>
            <label className="relative bg-white h-10 w-4/5 max-w-96 flex items-center gap-4 rounded-full border border-blue-400 ml-2">
            <i className="fa-solid fa-magnifying-glass pl-2 text-blue-500"></i>
            <input type="text" placeholder="Search..." value={search} onChange={getAllUsers} className="focus:outline-none w-4/5"/>
            <ul className={`w-full top-10 absolute bg-white top-0 shadow-md rounded  ${search ? 'block' : 'hidden'} `}>
            {searchUsers.map((user)=>(
                <Link to={`/profile/${user.userName}`} key={user.email}>
                <li className="p-2 flex gap-2 items-center" >
                        <img src={user.profile} className="h-10 w-10 rounded-full object-cover"/>
                        <div>
                        <p>{user.userName}</p>
                        <p className="font-bold italic">{user.name}</p>
                        </div>
                    </li>
                </Link>
                    
            ))}
            </ul>
            </label>
            <div className="flex gap-2 items-center mr-2">
            <i onClick={()=>navigate('/follow-request')}
             className="fa-solid fa-heart fa-xl p-2 rounded-full flex items-center cursor-pointer h-10 w-10 bg-slate-200 text-sky-600"></i>
            <img src={userInfo.profile} className="h-10 w-10   rounded-full object-cover bg-white cursor-pointer" onClick={()=>navigate(`/profile/${user_Name}`)}></img>
            </div>
            
        </nav>
    )
}
export default Navbar;
