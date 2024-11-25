import {  useEffect, useState } from "react";
import { useNavigate} from "react-router-dom";
import {userInformations } from "../apis";
import axios from "axios";
const Profile = ({setViewProfile,userEmail})=>{
    const navigate= useNavigate()
    const [render,setRender]=useState(0)
    const [name,setName]=useState('')
    const [email,setEmail] = useState('')
    const [profileImg,setProfileImg]=useState('')
    const [loading,setLoading]=useState(false)
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

    const userInfo = async()=>{
        setLoading(true)
        const data= await userInformations(userEmail)
        setLoading(false)
        setName(data.name)
        setProfileImg(data.profile)
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
       <div className="w-72 h-64 border fixed top-10 right-10 rounded bg-slate-200 
                   font-reem   shadow-md flex gap-1 flex-col items-center justify-between">
            <div className="flex items-center justify-between p-1 w-full ">
              <div className="w-full flex justify-center"><p className="text center">{userEmail}</p></div>  
            <i onClick={()=>setViewProfile(false)} className="fa-solid fa-xmark cursor-pointer"></i></div>
            <img className="h-24 w-24 rounded-full object-cover" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRXxfn1j1vKFy8yJeBGl2AS6Dcah-lKgHofg&s"/>
            <h1 className="text-2xl">{`Hii! `+name}</h1>
            <button onClick={logOut} className="flex gap-1 items-center mb-5">
            <i className="fa-solid fa-right-from-bracket" ></i>
            <p>Logout</p>
            </button>
       </div>
    )
}
export default Profile;