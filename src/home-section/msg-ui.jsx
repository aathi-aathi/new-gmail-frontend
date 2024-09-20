import { Link } from "react-router-dom";
import { getAllData } from "../apis";
import { useEffect, useState } from "react";

const MessageUI = () =>{
    const [users,setUsers]=useState([])
    const getAllUsers = async() =>{
      const data =  await getAllData()
      setUsers(data)
      }
    useEffect(()=>{
      getAllUsers()
    },[])
    return(
        <div className=" h-screen w-full  overflow-y-auto flex justify-center ">
            <div className="mt-16 md:mt-20 h-4/5 w-full max-w-screen-sm md:border md:rounded md:shadow-xl">
           {users.map(((user)=>(
            <Link to='/home/chat-box'><div className="h-16 border-b flex items-center justify-between">
            <div className="flex gap-4 ml-2">
                <img className="h-12 w-12 rounded-full object-cover" src={user.profile}></img>
            <div>
                <h1 className="font-medium text-lg">{user.userName}</h1>
                
            </div>
            </div>
            <div className="mr-2">
                <p>8.31 am</p>
            </div>
        </div>
        </Link>
           ))) }
            </div>
        </div>
    )
}
export default MessageUI;