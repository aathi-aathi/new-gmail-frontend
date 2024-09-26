import { useNavigate, useParams } from "react-router-dom";
import { getMessagesApi, sendMessageApi, userInformations } from "../apis";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

const ChatBox = ()=>{
    const navigate = useNavigate()
    const pathParam = useParams()
    const token = localStorage.getItem('token')
    const decoded = jwtDecode(token)
    const userName = decoded.userName
    const [message,setMessage]=useState('')
    const [messages,setMessages]=useState([])
    const [count,setCount]=useState(0)
    const [userData,setUserData] = useState({
        profile:'',
        name:''
    })
    
    const pathUserName  = pathParam.userName
    const userInfo = async()=>{
       const data = await userInformations(pathUserName)
       setUserData({profile:data.profile,name:data.name})
    }
    const sendMessage = async()=>{
        await sendMessageApi({from:userName,to:pathUserName,message:message})
        setMessage('')
        setCount(count+1)
    }
    const getMessages =async()=>{
       const data = await getMessagesApi(userName,pathUserName)      
       setMessages(data)
    }
    useEffect(()=>{
        userInfo()
    },[])
    useEffect(()=>{
        getMessages()
    },[count])
    return(
        <div className=" h-screen w-full  overflow-y-auto flex justify-center select-none ">
        <div className="flex gap-2 items-center absolute top-0 z-10 w-full border-b bg-gradient-to-r from-sky-200 to-indigo-300 h-16">
            <i className="fa fa-arrow-left ml-4 text-blue-600 cursor-pointer" onClick={()=>navigate('/home')}></i>
            <img src={userData.profile} className="h-10 w-10 rounded-full"/>
            <h1 className="text-xl font-bold italic text-white ">{userData.name}</h1>
        </div>
        <div className="flex flex-col mt-16 md:mt-20 relative h-4/5 max-sm:h-screen  w-full max-w-screen-sm md:border md:rounded md:shadow-xl">
            <div className="overflow-y-auto mb-12  h-full ">
                {messages.map((message)=>(
                <div
                 className={`w-3/4    rounded-xl m-2 p-2
                    shadow-md
                 ${message.from == userName ? 'float-right text-white bg-blue-400':'float-left text-sky-500'}  `}>
                        <h1 className="text-xl">{message.message}</h1>
                        <p className="text-sm float-right">{message.date}</p>
                    </div>
                ))
                }
            </div>
            <div className="p-2 flex gap-2 absolute max-sm:fixed bottom-0 w-full">
                <input
                type="text"
                placeholder="Message"
                value={message}
                onChange={(e)=>setMessage(e.target.value)}
                className="w-full rounded-full h-9 pl-4  text-sky-600 focus:outline-none border border-sky-500"
                />
               {message && <i onClick={sendMessage}
             className="fa-solid fa-paper-plane p-2 rounded-full flex
              items-center cursor-pointer h-9 w-9 bg-slate-200 text-sky-600"></i>}
            </div>
        </div>
    </div> 
    )
}
export default ChatBox;