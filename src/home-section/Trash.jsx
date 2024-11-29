import { jwtDecode } from 'jwt-decode'
import React, { useEffect, useState } from 'react'
import {   deleteMail, getInboxMails, getSentMails, moveMails } from '../apis'
const Trash = () => {
    const [allMails,setAllMails]=useState([]) 
  const [render,setRender]=useState(0)
  const token = localStorage.getItem('token')
    const decoded = jwtDecode(token)
    const userEmail = decoded.email
    const getallmails = async()=>{
      const inbox = await getInboxMails(userEmail)
      const sent = await getSentMails(userEmail)
      setAllMails(inbox.concat(sent))
    }
       const moveMail = async(id)=>{
       await moveMails({userEmail,id})
       setRender(render+1)
     }
     const deleted = async(id)=>{
      await deleteMail({userEmail,id})
      setRender(render+1)
    }
       useEffect(()=>{
        getallmails()
       },[render]) 
    return (
        <div className='font-reem max-md:ml-16'>
          <div className='m-3'><i className="fa-solid fa-rotate-right cursor-pointer" onClick={()=>setRender(render+1)}></i></div>
          <div>
             {allMails.filter((mail)=> mail.isDeleted).map((mail)=>(
              <div className='h-10 border-b bg-slate-100 hover:bg-slate-200 flex items-center' key={mail.id}>
               <div className='w-1/5  pl-2 flex gap-2 items-center'>
               <i className="fa-solid fa-file-import cursor-pointer" onClick={()=>moveMail(mail.id)}></i>
               <p className=''>{mail.senderName ? mail.senderName : 'Me'}</p></div>
               <div className='w-8/12 flex items-center max-md:justify-center'>
               <strong>{mail.subject} </strong>
               <p className='max-md:hidden'>- {mail.message}</p>
               </div> 
               <div className='flex items-center gap-2 '>
               <p>{mail.date}</p>
               <i className="fa-regular fa-trash-can cursor-pointer" onClick={()=>deleted(mail.id)}></i>
               </div>
             </div>))}
             <p className='text-sm text-center'>Term . Privacy . Programme Policy</p>
          </div>
        </div> 
    )
}
export default Trash