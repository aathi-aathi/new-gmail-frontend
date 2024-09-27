import { useNavigate, useParams } from "react-router-dom";
import { getMessagesApi, sendMessageApi, userInformations } from "../apis";
import { useEffect, useRef, useState } from "react";
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
    const [render,setRender]=useState(0)
    const scrollRef = useRef(null);
    const [userData,setUserData] = useState({
        profile:'',
        name:'',
        userName:'',
    })
    
    const pathUserName  = pathParam.userName
    const userInfo = async()=>{
       const data = await userInformations(pathUserName)
       console.log(data)
       setUserData({profile:data.profile,name:data.name,userName:data.userName})
    }
    const sendMessage = async()=>{
        await sendMessageApi({from:userName,to:pathUserName,message:message})
        setMessage('')
        setRender(render+1)
    }
    const getMessages =async()=>{
       const data = await getMessagesApi(userName,pathUserName)      
       setMessages(data)
    }
    useEffect(()=>{
        userInfo()
    },[])
    setTimeout(() => {
        setCount(count+1)
    }, 1000);
    
  useEffect(() => {
    // Scroll to the bottom after the component has rendered
    setTimeout(() => {
    
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      
    }, 0);
  }, [count]);
    useEffect(()=>{
        getMessages()
    },[count])
    return(
        <div className=" h-screen w-full flex justify-center select-none  bg-black bg-black">
        <div className="flex gap-2 items-center fixed top-0 z-20 w-full border-b bg-gradient-to-r from-teal-400 to-teal-600 h-16">
            <i className="fa fa-arrow-left ml-4 text-black cursor-pointer" onClick={()=>navigate('/home')}></i>
            <img src={userData.profile} className="h-10 w-10 rounded-full"/>
            <h1 className="text-xl font-bold italic text-white " onClick={()=>navigate(`/profile/${userData.userName}`)}>{userData.name}</h1>
        </div>
        <div  className="flex flex-col md:mt-20 relative h-4/5 max-sm:h-screen  w-full max-w-screen-sm md:border md:rounded md:shadow-xl">
            <div ref={scrollRef}  className=" scroll-smooth overflow-y-auto mb-12 h-full  "  >
                {messages.map((message)=>(
                <div
                 className={`w-3/4 rounded-xl m-2 p-2
                    
                 ${message.from == userName ? 'float-right bg-teal-400 ':'float-left border border-teal-400 text-teal-400'}`}>
                   
                         <h1 className={`text-md`}>{message.message}</h1>
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
                className="w-full rounded-full h-10 pl-4 bg-teal-400 placeholder:text-black text-black  focus:outline-none "
                />
               {message && <i onClick={sendMessage}
             className="fa-solid fa-paper-plane p-2 rounded-full flex justify-center
              items-center cursor-pointer flex-none h-10 w-10 bg-teal-400 text-black"></i>}
            </div>
        </div>
    </div> 
    )
}
export default ChatBox;