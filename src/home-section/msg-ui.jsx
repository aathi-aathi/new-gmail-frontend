import { Link } from "react-router-dom";
import { getAllData, getChatApi } from "../apis";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

const MessageUI = () =>{
    const [users,setUsers]=useState([])
    const token = localStorage.getItem('token')
    const decoded = jwtDecode(token)
    const userName = decoded.userName
    const getAllUsers = async() =>{
      const data =  await getChatApi(userName)
      setUsers(data)
      }
    useEffect(()=>{
      getAllUsers()
    },[])
    return(
        <div className="select-none h-screen w-full bg-teal-200  max-sm:bg-black  overflow-y-auto flex justify-center ">
            <div className="mt-16 md:mt-20 h-4/5 w-full bg-black  max-sm:h-fit  max-w-screen-sm  md:rounded md:shadow-xl">
           {users.map(((user)=>(
            <Link to={`/chat-box/${user.userName}`} key={user.userName}><div className="h-16  flex items-center justify-between">
            <div className="flex gap-4 ml-2">
                <img className="h-12 w-12 rounded-full object-cover" src={ user.profile ? user.profile : 'https://cdn-icons-png.flaticon.com/128/3177/3177440.png'}></img>
            <div>
                <h1 className="font-medium text-lg text-teal-400">{user.name}</h1>
                
            </div>
            </div>
            <div className="mr-2">
                <p></p>
            </div>
        </div>
        </Link>
           ))) }
            </div>
        </div>
    )
}
export default MessageUI;