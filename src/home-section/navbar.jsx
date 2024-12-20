import { useSelector } from "react-redux";
const Navbar = ({setToggle,toggle,setViewProfile,setOpen,search,setSearch}) =>{
    const userInfo = useSelector((state)=> state.users.userData)
  function toggling(){
    if(toggle){
        setToggle(false)
    }else{
        setToggle(true)
    }
  }
  function displayProfile(){
        setOpen(false)
        setViewProfile(true)
  }
    return(
        <nav className="select-none h-16 bg-violet-50 flex items-center justify-between gap-2 font-reem  w-full top-0 left-0 z-10">
             <div className="flex gap-1 items-center">
<div onClick={toggling} className="p-3 ml-2 hover:bg-slate-200 rounded-full cursor-pointer">
                <div className="w-5 border border-black mb-1"></div>
                <div className="w-5 border border-black mb-1"></div>
                <div className="w-5 border border-black mb-1"></div>
             </div>
             <img className="max-md:hidden" src="https://ssl.gstatic.com/ui/v1/icons/mail/rfr/logo_gmail_lockup_default_1x_r5.png"></img>
             </div>
             
            <label className="relative bg-indigo-100 h-12 w-4/5  max-w-3xl flex items-center
            gap-4 rounded-full  ml-2">
            <i className="fa-solid fa-magnifying-glass pl-2 text-slate-800"></i>
            <input type="text" placeholder="Search mail" value={search} onChange={(e)=>setSearch(e.target.value)}
             className="bg-inherit placeholder:text-slate-500
             focus:outline-none w-4/5"/>
            </label>
            <div onClick={displayProfile} className="flex gap-2 items-center mr-2">
            <img  src={userInfo.profile} className="h-9 w-9  flex-none  rounded-full object-cover bg-white cursor-pointer"></img>
            </div>
            
        </nav>
    )
}
export default Navbar;
