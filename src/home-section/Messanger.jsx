import React, { useState } from 'react'
import { sendDraftApi, sendMessageApi } from '../apis'
const Messanger = ({setOpen,userEmail}) => {
  const [email,setEmail] = useState('')
  const [subject,setSubject] = useState('')
  const [message,setMessage] = useState('')
  const sendMail =async()=>{
      await sendMessageApi({from:userEmail,to:email,subject:subject,message:message})
      setOpen(false)
  }
  const draftMail = async()=>{
    await sendDraftApi({from:userEmail,to:email,subject:subject,message:message})
    setOpen(false)
  }
  return (
    <div className='w-96 h-96 fixed bottom-10 right-10 rounded-md max-md:w-4/5 p
    shadow-md bg-white font-reem' >
     <div onClick={draftMail} className='flex p-2 justify-between bg-violet-100 cursor-pointer rounded-t-md'><p>New Message</p>
          <i className="fa-solid fa-xmark"></i>
     </div>  
     <form className='flex flex-col h-4/5'>
      <input
       type='email'
       value={email}
       onChange={(e)=>setEmail(e.target.value)}
       placeholder='To'
       className='p-2 ml-1 mr-1 focus:outline-none border-b'
       />
       <input
       type='text'
       value={subject}
       onChange={(e)=>setSubject(e.target.value)}
       placeholder='Subject'
       className='p-2 ml-1 mr-1 focus:outline-none border-b'
       />
       <textarea 
         value={message}
         onChange={(e)=>setMessage(e.target.value)}
         className='ml-1 mr-1 focus:outline-none  resize-none'
        ></textarea>
      </form>
     <button className='m-1 p-1 bg-blue-600 text-white rounded-full w-16 ' onClick={sendMail}>send</button> 
    </div>
  )
}
export default Messanger