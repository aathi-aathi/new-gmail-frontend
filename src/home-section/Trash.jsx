import { jwtDecode } from 'jwt-decode'
import React, { useEffect, useState } from 'react'
import {   getInboxMails, getSentMails, moveMails } from '../apis'

const Trash = () => {
    const [allMails,setAllMails]=useState([])
    const [loading,setLoading] = useState(false)
  const [render,setRender]=useState(0)
  const token = localStorage.getItem('token')
    const decoded = jwtDecode(token)
    const userEmail = decoded.email
    const getallmails = async()=>{
      setLoading(true)
      const inbox = await getInboxMails(userEmail)
      const sent = await getSentMails(userEmail)
      setLoading(false)
      setAllMails(inbox.concat(sent))
    }
       const moveMail = async(id)=>{
       await moveMails({userEmail,id})
       setRender(render+1)
     }
       useEffect(()=>{
        getallmails()
       },[render]) 
    return (
        <div className='font-reem'>
          <div className='m-3'><i className="fa-solid fa-rotate-right"></i></div>
          <div>
             {allMails.filter((mail)=> mail.isDeleted).map((mail)=>(<div className='h-10 border-b bg-slate-100 flex items-center' key={mail.id}>
               <div className='w-1/5  pl-2 flex gap-2 items-center'>
               <i className="fa-solid fa-file-import cursor-pointer" onClick={()=>moveMail(mail.id)}></i>
               <p className=''>{mail.senderName ? mail.senderName : 'Me'}</p></div>
               <div className='w-8/12 flex items-center'>
               <strong>{mail.subject} -</strong>
               <p>{mail.message}</p>
               </div>
               <div className='flex items-center gap-2 '>
               <p>{mail.date}</p>
               </div>
             </div>))}
          </div>
        </div> 
    )
}

export default Trash