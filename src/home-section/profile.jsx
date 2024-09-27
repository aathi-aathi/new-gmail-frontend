import {  useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getFollowData, postFollowData, userInformations } from "../apis";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
const Profile = ()=>{
    const navigate= useNavigate()
    const pathParam = useParams()
    const [render,setRender]=useState(0)
    const [name,setName]=useState('')
    const [userName,setUserName]=useState('')
    const [userEmail,setUserEmail] = useState('')
    const [profileImg,setProfileImg]=useState('')
    const [loading,setLoading]=useState(false)
    const [follow,setFollow]=useState('Follow')
    console.log(follow)
    const pathUsename = pathParam.userName
    const token = localStorage.getItem('token')
    const decoded = jwtDecode(token)
    const user_Name = decoded.userName
    const handleChange =async(e) =>{
        if (e.target.files && e.target.files.length > 0) {
            setLoading(true)
           const file = e.target.files[0]
           const formData = new FormData()
           formData.append('file',file) 
           await axios.post(`${import.meta.env.VITE_BACKEND_URL}/set-profile/${user_Name}`,formData) 
           .then(res=>console.log(res))
           .catch(err=>console.log(err))      
           setRender(render+1)
           setLoading(false)
    } 
}
const handleFollow = async()=>{
  const data =  await postFollowData({from:user_Name,to:pathUsename})
  setRender(render+1)
  
}
const getFollow=async()=>{
   const data =  await getFollowData(user_Name,pathUsename)
   if(data.status == 'request sent'  ){
    setFollow('Request sent')
   }else if(data.status == 'accepted'){
    setFollow('Following')
   }else{
    setFollow('Follow')
   }
}
    const userInfo = async()=>{
        setLoading(true)
        const data= await userInformations(pathUsename)
        setLoading(false)
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
useEffect(()=>{
    getFollow()
})
    return(
        <div className=" flex justify-center md:items-center h-screen w-full select-none">
        <div className="flex h-96 bg-black max-sm:h-full flex-col items-center max-sm:justify-start gap-4 justify-evenly w-full max-w-96 mt-12 md:shadow-xl hidden:border md:border md:rounded-md ">
            <div className="flex gap-4 items-center absolute top-0  w-full border-b bg-gradient-to-r from-teal-400 to-teal-600 h-12">
                <i className="fa fa-arrow-left ml-4 text-white cursor-pointer" onClick={()=>navigate('/home')}></i>
                <h1 className="text-xl font-bold  text-white">Profile</h1>
            </div>
            <div className="relative">
                <img className={`mt-4 border border-teal-400 h-36 w-36 rounded-full object-cover ${loading && 'animate-pulse'}`} 
                src= {profileImg ? profileImg : 'https://cdn-icons-png.flaticon.com/128/3177/3177440.png'}/>
                <input className="hidden" id="profileInput" accept="image/*" type="file" onChange={handleChange}/>
                {pathUsename== user_Name &&  <label htmlFor='profileInput' className="absolute right-1 bottom-1 bg-slate-100 rounded-full p-2">
                    <i className="fa-solid fa-camera fa-xl text-teal-400"></i>
                </label>}
            </div>
            <h1 className="font-bold text-white text-xl">{name}</h1>
            <div className="w-11/12 flex gap-2 justify-center">
            {pathUsename != user_Name && 
            <button onClick={handleFollow} disabled={follow =='Follow'? false : true} className={` text-white w-3/4 p-1
             rounded cursor-pointer 
             ${follow =='Request sent' ? 'bg-slate-400': 'bg-teal-400'}`}>{follow}</button>}
             {follow=='Following' && <button className="text-white w-3/4 p-1
             rounded cursor-pointer bg-teal-400" onClick={()=>navigate(`/chat-box/${pathUsename}`)}>Message</button>}
            </div>
            

            <div className="flex flex-col gap-4 w-11/12 rounded border-teal-400 border-2 p-2">
               <div className="flex gap-4 items-center  ">
                <i className="fa-solid fa-user text-teal-400"></i>
                <p  className="font-bold text-white ">{userName}</p>
              </div>
              <div className="flex gap-4 items-center ">
              <i className="fa-solid fa-envelope text-teal-400"></i>
                <p className="font-bold text-white">{userEmail}</p>
              </div>
            </div>
            {pathUsename== user_Name && <div className="flex gap-2 items-center text-red-600 cursor-pointer hover:text-red-700" onClick={logOut}>
            <i className="fa-solid fa-arrow-right-from-bracket"></i>
             <p className="font-medium">Log Out</p>
            </div>}
        </div>
        </div>
    )
}
export default Profile;