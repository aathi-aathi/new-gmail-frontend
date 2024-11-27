import React, { useEffect, useState } from 'react'
import { getInboxMails, getSentMails, trashMails, unStarApi } from '../apis'
import { jwtDecode } from 'jwt-decode'

const Star = () => {
  const [allMails,setAllMails] = useState([])
  const [render,setRender] = useState(0)
  const token = localStorage.getItem('token')
  const decoded = jwtDecode(token)
  const userEmail = decoded.email
  const getallmails = async()=>{
    const inbox = await getInboxMails(userEmail)
    const sent = await getSentMails(userEmail)
    setAllMails(inbox.concat(sent))
  }
  const setStarFucntion = async(id)=>{
    await unStarApi({userEmail,id})
    setRender(render+1)
  }
  const deleted = async(id)=>{
    await trashMails({userEmail,id})
    setRender(render+1)
  }
  useEffect(()=>{
      getallmails()
  },[render])
  return (
    <div className='font-reem max-md:ml-16'>
        <div className='m-3'><i className="fa-solid fa-rotate-right cursor-pointer" onClick={()=>setRender(render+1)}></i></div>
       <div>
           {allMails.filter((mail)=>( !mail.isDeleted && mail.isStarred)).map((mail)=>(<div className='h-10 border-b bg-slate-100 flex items-center' key={mail.id}>
             <div className='w-1/5  pl-2 flex gap-2 items-center'>
             <i className='fa-solid fa-star text-yellow-400 cursor-pointer' onClick={()=>setStarFucntion(mail.id)}></i>
              <p className=''>{mail.senderName ? mail.senderName : 'Me'}</p></div>
             <div className='w-8/12 flex items-center'>
             <strong>{mail.subject} </strong>
             <p className='max-md:hidden'> -{mail.message}</p>
             </div>
             <div className='flex items-center gap-2 '>
             <p className='text-sm'>{mail.date}</p>
             <i className="fa-regular fa-trash-can cursor-pointer" onClick={()=>deleted(mail.id)}></i>
             </div>
           </div>))}
           <p className='text-sm text-center'>Term . Privacy . Programme Policy</p>
        </div> 
      </div>
    )
}

export default Star;