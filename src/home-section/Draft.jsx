import { jwtDecode } from 'jwt-decode'
import React, { useEffect, useState } from 'react'
import { getDraftMails } from '../apis'

const Draft = () => {
    const [draft,setDraft] =useState([])
    const [render,setRender] = useState(0)
  const token = localStorage.getItem('token')
  const decoded = jwtDecode(token)
  const userEmail = decoded.email
  const getDraft = async()=>{
   const data=  await getDraftMails(userEmail)
   setDraft(data)
  }
  useEffect(()=>{
    getDraft()
  },[render])
  return (
    <div className='font-reem max-md:ml-16'>
    <div className='m-3'><i className="fa-solid fa-rotate-right cursor-pointer" onClick={()=>setRender(render+1)}></i></div>
   <div>
       {draft.map((mail)=>(<div className='h-10 border-b bg-slate-100 flex items-center' key={mail.id}>
         <div className='w-1/5  pl-2 flex gap-2 items-center'>
          <p className='text-red-500'>Draft</p></div>
         <div className='w-8/12 flex items-center'>
         <strong>{mail.subject} </strong>
         <p className='max-md:hidden'>-{mail.message}</p>
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

export default Draft