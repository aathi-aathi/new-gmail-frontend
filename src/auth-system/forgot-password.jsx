import { useState } from "react";
import { forgotPassword } from "../apis";
import { useNavigate } from "react-router-dom";
const ForgotPassword = () =>{
const [email,setEmail]=useState('')
const [emailError,setEamilError]=useState('')
const [loading,setLoading] = useState(false)
const navigate = useNavigate()
const handleSubmit = async(e)=>{
    e.preventDefault()
    setLoading(true)
    const data = await forgotPassword({email})
    setLoading(false)
    if(data.code == 1){
        navigate(`/reset-verify/${data.token}`)
    }else{
        setEamilError("We can't find your email")
    }
}
    return(
        <div className="flex justify-center items-center h-screen font-reem">
      <div className="rounded h-fit w-11/12 max-w-96 flex flex-col justify-center items-center  shadow-lg" >
      <img src="https://ssl.gstatic.com/ui/v1/icons/mail/rfr/logo_gmail_lockup_default_1x_r5.png"></img>
            {emailError && <p className="font-bold text-red-700 mb-2 text-center">{emailError}</p>}
            <p className="text-sm text-slate-500 w-4/5 text-center">Enter your email and we'll send you a link to reset your password. </p>
            <form className="w-4/5" onSubmit={handleSubmit}>
            <label>
                 <input 
                 value={email}
                 onChange={(e)=>setEmail(e.target.value)}
                 className=" pl-2 focus:outline-none
                 border border-slate-400 bg-inherit placeholder:text-sm  rounded block w-full h-9 mb-2 mt-2
                 "
                 type="email" placeholder="Enter your Email..." required/>
                 {emailError && <p className="text-sm text-red-700">{emailError}</p>}
            </label> 
            <button className="flex justify-center bg-blue-500 mb-5 rounded w-full p-2 text-white hover:bg-blue-600 mb-2 ...">
            {loading ? <div className="w-5 h-5 border-4 border-t-transparent 
            border-white rounded-full animate-spin" 
            role="status"><span className="sr-only">Loading...</span>
            </div>: 'Find your account'}
            </button> 
 
            </form>
        </div>
        </div>
    )
}
export default ForgotPassword;