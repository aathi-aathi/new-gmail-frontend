import { useNavigate } from "react-router-dom";

const ChatBox = ()=>{
    const navigate = useNavigate()
    return(
        <div className=" h-screen w-full  overflow-y-auto flex justify-center">
          <div className=" mt-16 md:mt-20 h-4/5 w-full max-w-screen-sm md:border md:rounded md:shadow-xl">
          <div className="h-16 border-b flex  bg-slate-400 fixed  w-full sm:relative top-0 left-0 z-10">
                <div className="flex gap-4 ml-2 items-center">
                    <i className="fa fa-arrow-left ml-2 text-white cursor-pointer" onClick={()=>navigate('/home')}></i>
                    <img className="h-12 w-12 rounded-full object-cover" src='data:image/jpeg;base64,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'></img>
                <div>
                    <h1 className="font-medium text-xl text-white">Name</h1>
                </div>
                </div>
               </div>
          </div>
        </div>
    )
}
export default ChatBox;