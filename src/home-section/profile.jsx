import {  useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userInformations } from "../apis";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
const Profile = ()=>{
    const navigate= useNavigate()
    const [render,setRender]=useState(0)
    const [name,setName]=useState('')
    const [userName,setUserName]=useState('')
    const [userEmail,setUserEmail] = useState('')
    const [profileImg,setProfileImg]=useState('')
   const token = localStorage.getItem('token')
    const decoded = jwtDecode(token)
    const email = decoded.email
    
    const handleChange =async(e) =>{
        if (e.target.files && e.target.files.length > 0) {
           const file = e.target.files[0]
           const formData = new FormData()
           formData.append('file',file) 
           await axios.post(`${import.meta.env.VITE_BACKEND_URL}/set-profile/${email}`,formData) 
           .then(res=>console.log(res))
           .catch(err=>console.log(err))      
           setRender(render+1)
    } 
}
    const userInfo = async()=>{
        const data= await userInformations(email)
        setName(data.name)
        setUserEmail(data.email)
        setProfileImg(data.profile)
        setUserName(data.userName)
}
 const logOut = ()=>{
    window.localStorage.removeItem('isAuthenticate')
    window.localStorage.removeItem('token')
    navigate('/login')
 }
useEffect(()=>{
    userInfo()
},[render])
    return(
        <div className=" flex justify-center md:items-center h-screen w-full">
        <div className="flex h-96 flex-col items-center justify-evenly w-full max-w-96 mt-12 md:shadow-xl hidden:border md:border md:rounded-md ">
            <div className="flex gap-4 items-center absolute top-0  w-full border-b bg-gradient-to-r from-sky-200 to-indigo-300 h-12">
                <i className="fa fa-arrow-left ml-4 text-blue-600 cursor-pointer" onClick={()=>navigate('/home')}></i>
                <h1 className="text-xl font-bold  text-blue-600">Profile</h1>
            </div>
            <div className="relative">
                <img className="h-36 w-36 rounded-full object-cover" src= {profileImg}/>
                <input className="hidden" id="profileInput" accept="image/*" type="file" onChange={handleChange}/>
                <label htmlFor='profileInput' className="absolute right-1 bottom-1 bg-slate-100 rounded-full p-2">
                    <i className="fa-solid fa-camera fa-xl text-blue-500"></i>
                </label>
            </div>
            <h1 className="font-bold text-xl hover:animate-bounce">{name}</h1>
            <div className="flex flex-col gap-4 w-11/12 rounded border-2 p-2">
               <div className="flex gap-4 items-center  ">
                <i className="fa-solid fa-user text-slate-500"></i>
                <p  className="font-bold text-slate-700">{userName}</p>
              </div>
              <div className="flex gap-4 items-center ">
              <i className="fa-solid fa-envelope  text-slate-500"></i>
                <p className="font-bold text-slate-700">{userEmail}</p>
              </div>
            </div>
            <div className="flex gap-2 items-center text-red-600 cursor-pointer hover:text-red-700" onClick={logOut}>
            <i className="fa-solid fa-arrow-right-from-bracket"></i>
            <p className="font-medium">Log Out</p>
            </div>
        </div>
        </div>
    )
}
export default Profile;