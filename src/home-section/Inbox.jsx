import React, { useEffect, useState } from 'react'
import { getInboxMails, setStarApi, trashMails, unStarApi } from '../apis'
import { jwtDecode } from 'jwt-decode'
import { useNavigate } from 'react-router-dom'
const Inbox = ({search}) => {
  const [inbox,setInbox]=useState([])
  const [render,setRender]=useState(0)   
  const navigate = useNavigate()                                                                   
  const token = localStorage.getItem('token')
    const decoded = jwtDecode(token)
    const userEmail = decoded.email
  const inboxMail = async()=>{
   const data = await getInboxMails(userEmail)
   setInbox(data)
  }
  const deleted = async(id)=>{
  await trashMails({userEmail,id})
  setRender(render+1)
} 
 const setStarFucntion = async(id,isStarred)=>{
  if(!isStarred){
    await setStarApi({userEmail,id})
  }else{
    await unStarApi({userEmail,id})
  }
  setRender(render+1)   
 }
  useEffect(()=>{
    inboxMail()
  },[render])
  return (
  <div className='font-reem max-md:ml-16'>
      <div className='m-3'><i className="fa-solid fa-rotate-right cursor-pointer" onClick={()=>setRender(render+1)}></i></div>
     <div>
         {inbox.filter((mail)=> !mail.isDeleted && ( search.toLowerCase() === "" ? mail :
          mail.senderName.toLowerCase().includes(search) || mail.subject.toLowerCase().includes(search))).map((mail)=>(
          <div className='h-10 border-b bg-slate-100 hover:bg-slate-200 flex items-center' key={mail.id}>
           <div className='w-1/5  pl-2 flex gap-2 items-center'>
           <i className={`${mail.isStarred ? 'fa-solid fa-star text-yellow-400'  : 'fa-regular fa-star'} cursor-pointer`} onClick={()=>setStarFucntion(mail.id,mail.isStarred)}></i>
           <img className='h-8 w-8 rounded-full object-cover flex-none max-md:hidden' src={mail.senderImg}/> 
            <p className=''>{mail.senderName}</p></div>
           <div className='w-8/12 flex items-center max-md:justify-center cursor-pointer' onClick={()=>navigate(`/home/inbox-page/${mail.id}`)}>
           <strong>{mail.subject} </strong>
           <p className='max-md:hidden'>-{mail.message}</p>
           </div>
           <div className='flex items-center gap-2'>
           <p className='text-sm'>{mail.date}</p>
           <i className="fa-regular fa-trash-can cursor-pointer" onClick={()=>deleted(mail.id)}></i>
           </div>
         </div>))}
         <p className='text-sm text-center'>Term . Privacy . Programme Policy</p>
      </div> 
    </div>
  )
}

export default Inbox;