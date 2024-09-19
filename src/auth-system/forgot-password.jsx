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

  
    console.log({email})
}
    return(
        <div className="flex justify-center items-center h-screen bg-gradient-to-r from-sky-200 to-indigo-300">
      <div className="rounded h-fit w-11/12 max-w-96 flex flex-col justify-center items-center bg-white shadow-lg" >
            <h2 className="text-xl text-center font-black text-blue-700 mb-4">Forgot Password</h2>
            {emailError && <p className="font-bold text-red-700 mb-2 text-center">{emailError}</p>}
            <p className="text-sm text-slate-500 w-4/5 text-center">Enter your email and we'll send you a link to reset your password. </p>
            <form className="w-4/5" onSubmit={handleSubmit}>
            <label>
                 <input 
                 value={email}
                 onChange={(e)=>setEmail(e.target.value)}
                 className=" pl-2 focus:outline-none
                 border rounded block w-full h-9 mb-2 mt-2
                 placeholder:italic"
                 type="email" placeholder="Enter your Email..." required/>
                 {emailError && <p className="text-sm text-red-700">{emailError}</p>}
            </label>
            
            <button className="flex justify-center bg-blue-700 rounded w-full p-2 text-white hover:bg-blue-600 mb-2 ...">
            {loading ? <div className="w-5 h-5 border-4 border-t-transparent 
            border-blue-500 rounded-full animate-spin" 
            role="status"><span className="sr-only">Loading...</span>
            </div>: 'Find your account'}
            </button> 
 
            </form>
        </div>
        </div>
    )
}
export default ForgotPassword;