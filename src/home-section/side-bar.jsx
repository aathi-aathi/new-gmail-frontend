import React from 'react'
import { Link } from 'react-router-dom'
const Sidebar = ({toggle,setOpen,setViewProfile}) => {
    const list =[
        {
            name:"Inbox",
            path:"/home",
            icon:"fa-solid fa-inbox text-dark"
        },
        {
            name:"Starred",
            path:"/home/starred",
            icon:"fa-regular fa-star"
        },
        {
            name:"Sent",
            path:"/home/sent",
            icon:"fa-solid fa-paper-plane text-dark"
        },
        {
            name:"Draft",
            path:"/home/draft",
            icon:"fa-regular fa-note-sticky"
        },
    
        {
            name:"Trash",
            path:"/home/trash",
            icon:"trash fa-solid fa-trash text-dark"
        },
    ]
    function composeview(){
        setOpen(true)
        setViewProfile(false)
    }
  return(
    <div className= {`h-full bg-violet-50 ${!toggle ? 'w-16' :'w-64'} font-reem max-md:fixed `}>
        <button onClick={composeview} className={`flex gap-2 items-center h-14 rounded-2xl ml-1 ${!toggle ?'w-3/4' : 'w-32'} 
         justify-center bg-sky-200 hover:shadow-md` }>
        <i className="fa-solid fa-pencil"></i>{toggle && 'Compose'}</button>
        <div className='mt-5'>
            {list.map((item,index)=>(
                <Link to={item.path} key={index} className='flex gap-2 items-center hover:bg-violet-100 rounded-r-2xl pl-5 h-8'>
                    <i className={item.icon}></i>
                    {toggle && <p>{item.name}</p>}
                </Link>
            ))}
        </div>
    </div>
  )
}

export default Sidebar;