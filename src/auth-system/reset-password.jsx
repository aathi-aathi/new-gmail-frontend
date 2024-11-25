import { useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate, useParams } from "react-router-dom";
import { resetpassword } from "../apis";
const ResetPassword = () =>{
const [isChecked,setIsChecked]= useState(false)
const [loading,setLoading] = useState(false)
const [passType,setPassType] =useState('password')
const [password,setPassword]=useState('')
const [rePassword,setRePassword]=useState('')
const [passwordError,setPasswordError]=useState('')
const navigate = useNavigate()
const pathparam = useParams()
const token = pathparam.token
const decoded = jwtDecode(token)
const email = decoded.email
const handleCheck= (e)=>{
    setIsChecked(e.target.checked)
    if(e.target.checked){
        setPassType('text')
    }else{
        setPassType('password')
    }
}
const handleSubmit = async(e)=>{
    e.preventDefault()
    if(password === rePassword){
        setLoading(true)
        await resetpassword({email,password})
        setLoading(false)
        navigate('/login')
    }else{
        setPasswordError("Password doesn't match")
    }
    
}
    return(
        <div className="flex justify-center items-center h-screen font-reem">
        <div className="rounded h-78 w-11/12 max-w-96 flex flex-col justify-center items-center bg-white shadow-lg" >
        <img src="https://ssl.gstatic.com/ui/v1/icons/mail/rfr/logo_gmail_lockup_default_1x_r5.png"></img>
            <form className="w-4/5" onSubmit={handleSubmit}>
            <label>
                 <input 
                 value={password}
                 onChange={(e)=>setPassword(e.target.value)}
                 className="pl-2 focus:outline-none
                 border rounded block w-full h-9 mb-4"
                 
                 type={passType} placeholder="Create your Password..." required/>
            </label>
            <label>
                 <input 
                 value={rePassword}
                 onChange={(e)=>setRePassword(e.target.value)}
                 className="pl-2 focus:outline-none
                 border rounded block w-full h-9 mb-2
                "
                 type={passType} placeholder="Confirm your Password..." required/>
                 {passwordError && <p className="text-sm text-red-700">{passwordError}</p>}
            </label>
            <div className="flex justify-between  mb-4">
                <label className="flex gap-1"><input type='checkbox' checked={isChecked} onChange={handleCheck} className="cursor-pointer"/>
                <span className="text-sm text-slate-500">Show Password</span></label>
            </div>
            <button className="flex justify-center bg-blue-700 rounded w-full p-2 text-white hover:bg-blue-600 mb-4 ...">
            {loading ? <div className="w-5 h-5 border-4 border-t-transparent 
            border-white rounded-full animate-spin" 
            role="status"><span className="sr-only">Loading...</span>
            </div>: 'Reset Password'}
            </button> 
            </form>
        </div>
        </div>
    )
}
export default ResetPassword;