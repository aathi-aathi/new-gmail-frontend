import { useNavigate, useParams } from "react-router-dom";
import { getSentMails } from "../apis";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
const SingleSent = ()=>{
    const[inbox,setInbox]=useState([])
const pathParams = useParams()
const navigate = useNavigate()
const token = localStorage.getItem('token')
const decoded = jwtDecode(token)
const userEmail = decoded.email
const sentMail = async()=>{
    const data = await getSentMails(userEmail)
    setInbox(data)
   }
   useEffect(()=>{
    sentMail()
   },[])
    return(
        <div className="bg-slate-50 font-reem h-full max-md:ml-16" >  
        {inbox.filter((mailData)=>pathParams.id==mailData.id).map((mailData)=>(
                <div key={mailData.id}> 
                <div className="flex items-center justify-between ml-2 mr-5">
                <i className="fa-solid fa-arrow-left cursor-pointer" onClick={()=>navigate("/home")}></i>
                <p>{mailData.date}</p>
                </div>
                <h1 className="text-2xl  bg-violet-100 p-1 font-bold">{mailData.subject}</h1>
                <div className="mt-2 font-bold">To : {mailData.to} </div>
               <div className="ml-10 mt-2"> {mailData.message}</div>
                </div>
           ))}
        </div>   
    )
}
export default SingleSent;