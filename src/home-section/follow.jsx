import { useEffect, useState } from "react";
import { acceptRequestApi, getFollowRequestData, rejectRequestApi } from "../apis";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const FollowRequest = ()=>{
    const navigate = useNavigate()
    const [followReq,setFollowReq]=useState([])
    const [count,setCount]=useState(0)
    const token = localStorage.getItem('token')
    const decoded = jwtDecode(token)
    const user_Name = decoded.userName
    const getFollowRequest = async ()=>{
      const data =  await getFollowRequestData(user_Name)
      setFollowReq(data)
    }
    const acceptRequest=async(userName)=>{
       await acceptRequestApi({from:userName ,to:user_Name}) 
       setCount(count+1)
    }
    const rejectRequest=async(userName)=>{
        await rejectRequestApi({from:userName ,to:user_Name}) 
        setCount(count+1)
     }
    useEffect(()=>{
        getFollowRequest()
    },[count])
    return(
        <div className=" h-screen w-full  overflow-y-auto flex justify-center select-none ">
            <div className="flex gap-4 items-center absolute top-0  w-full border-b bg-gradient-to-r from-teal-400 to-teal-600 h-12">
                <i className="fa fa-arrow-left ml-4 text-white cursor-pointer" onClick={()=>navigate('/home')}></i>
                <h1 className="text-xl font-bold  text-white">Follow Requests</h1>
            </div>
            <div className="max-sm:h-screen md:mt-20 h-4/5 w-full max-w-screen-sm md:border bg-black md:rounded md:shadow-xl">
            {followReq.map((follow)=>(<div className="h-16 border-b flex items-center justify-between">
            <div className="flex gap-4 ml-2">
                <img className="h-12 w-12 rounded-full object-cover" src={follow.profile}></img>
            <div>
                <h1 className="font-medium text-lg">{follow.userName}</h1>
                 <p className="font-bold  text-xl">{follow.name}</p>
            </div>
            </div>
            <div className="mr-2 flex gap-2">
                <button className="p-1 rounded bg-sky-500 text-white" onClick={()=>acceptRequest(follow.userName)}>Accept</button>
                <button className="p-1 rounded bg-slate-200 text-black" onClick={()=>rejectRequest(follow.userName)}>Decline</button>
            </div>
        </div>))}
            </div>
        </div>
    )
}
export default FollowRequest;