import { jwtDecode } from 'jwt-decode'
import React, { useEffect, useState } from 'react'
import { getSentMails, setStarApi, trashMails, unStarApi } from '../apis'
import { useNavigate } from 'react-router-dom'
const Sent = ({search}) => {
    const [sent,setSent]=useState([])
    const [render,setRender]=useState(0)
    const navigate =useNavigate()
    const token = localStorage.getItem('token')
    const decoded = jwtDecode(token)
    const userEmail = decoded.email
    const sentMail = async()=>{
    const data = await getSentMails(userEmail)
    setSent(data)
  }
  const deleted = async(id)=>{
    await trashMails({userEmail,id})
    setRender(render+1)
  }
const setStarFucntion = async(id,isStarred)=>{
  console.log(isStarred)
  if(!isStarred){
    await setStarApi({userEmail,id})
  }else{
    await unStarApi({userEmail,id})
  }
  setRender(render+1)   
 }
  useEffect(()=>{
    sentMail()
  },[render])
  return (
    <div className='font-reem max-md:ml-16'>
      <div className='m-3'><i className="fa-solid fa-rotate-right" onClick={()=>setRender(render+1)}></i></div>
      <div>
         {sent.filter((mail)=> !mail.isDeleted && ( search.toLowerCase() === "" ? mail :
           mail.subject.toLowerCase().includes(search)) ).map((mail)=>(
           <div className='h-10 border-b bg-slate-100 hover:bg-slate-200 flex items-center' key={mail.id}>
           <div className='w-1/5  pl-2 flex gap-2 items-center'>
           <i className={`${mail.isStarred ? 'fa-solid fa-star text-yellow-400 ' : 'fa-regular fa-star'} cursor-pointer`} onClick={()=>setStarFucntion(mail.id,mail.isStarred)}></i>
           <p className=''>Me</p></div>
           <div className='w-8/12 flex items-center max-md:justify-center cursor-pointer' onClick={()=>navigate(`/home/sent-page/${mail.id}`)}>
           <strong>{mail.subject} </strong>
           <p className='max-md:hidden'>- {mail.message}</p>
           </div>
           <div className='flex items-center gap-2 '>
           <p className='max-md:hidden'>{mail.date}</p>
           <i className="fa-regular fa-trash-can cursor-pointer" onClick={()=>deleted(mail.id)}></i>
           </div>
         </div>))}  
         <p className='text-sm text-center mt-2'>Term . Privacy . Programme Policy</p> 
      </div> 
    </div>
  )
}
export default Sent