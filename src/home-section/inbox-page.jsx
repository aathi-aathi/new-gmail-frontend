import { useNavigate, useParams } from "react-router-dom";
import { getInboxMails } from "../apis";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
const SingleInbox = ()=>{
    const[inbox,setInbox]=useState([])
const pathParams = useParams()
const navigate = useNavigate()
const token = localStorage.getItem('token')
const decoded = jwtDecode(token)
const userEmail = decoded.email
const inboxMail = async()=>{
    const data = await getInboxMails(userEmail)
    setInbox(data)
   }
   useEffect(()=>{
    inboxMail()
   },[])
    return(
        <div className="bg-slate-50 font-reem h-full max-md:ml-16" >
           
        {inbox.filter((mailData)=>pathParams.id==mailData.id).map((mailData)=>(
                <div key={mailData.id}> 
                <div className="flex items-center justify-between ml-2 mr-5"> <i className="fa-solid fa-arrow-left cursor-pointer" onClick={()=>navigate("/home")}></i>
                 <p >{mailData.date}</p>
                </div>
                
                <div className="flex items-center gap-1 mt-2 bg-violet-200 h-16 py-1">
                    <div className="w-12">
                    <img src={mailData.senderImg} className="transition cursor-pointer ease-in-out duration-300 hover:rounded md:h-12 md:w-12  h-9 w-9 hover:h-48 hover:w-48 hover:fixed   rounded-full object-cover"/>
                    </div>
               
                <h1 className="md:text-2xl  p-1 font-bold">{mailData.from}</h1> 
                </div>
                <div className="mt-2 font-bold">{mailData.subject} </div>
               <div className="ml-10 mt-2"> {mailData.message}</div>
                </div>
           ))}
        </div>   
    )
}
export default SingleInbox;