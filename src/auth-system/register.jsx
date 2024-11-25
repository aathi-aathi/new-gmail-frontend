import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { postData } from "../apis";

const Register = () =>{
const navigate = useNavigate()
const [isChecked,setIsChecked]= useState(false)
const [passType,setPassType] =useState('password')
const [name,setName]=useState('')
const [email,setEmail]=useState('')
const [password,setPassword]=useState('')
const [rePassword,setRePassword]=useState('')
const [passwordError,setPasswordError]=useState('')
const [existError,setExistError] = useState('')
const [loading,setLoading] = useState(false)
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
       const data =  await postData({name,email,password})
        setLoading(false)
        if(data.code == 1){
            setExistError('User already exist!')
        }else{
             navigate(`/otp-verify/${data.token}`)
        }
    }else{
        setPasswordError("Password doesn't match")
    }
    
}
    return(
        <div className="flex justify-center items-center h-screen font-reem">
        <div className="rounded h-fit w-11/12 max-w-96 flex flex-col  justify-center items-center  shadow-lg" >
            <img src="https://ssl.gstatic.com/ui/v1/icons/mail/rfr/logo_gmail_lockup_default_1x_r5.png"></img>
            {existError && <p className="font-bold text-red-700">{existError}</p>}
            <form className="w-4/5" onSubmit={handleSubmit}>
            <label>
                 <input 
                 value={name}
                 onChange={(e)=>setName(e.target.value)}
                 className=" pl-2 focus:outline-none
                 border border-slate-400 bg-inherit placeholder:text-sm placeholder:text-slate-400 text-black rounded block w-full h-9 mt-4 mb-4
                 "
                 type="text" placeholder="Enter your Name..." required/>
            </label>
            <label>
                 <input 
                 value={email}
                 onChange={(e)=>setEmail(e.target.value)}
                 className=" pl-2 focus:outline-none
                 border border-slate-400 bg-inherit placeholder:text-sm placeholder:text-slate-400 text-black rounded block w-full h-9 mb-4
                 "
                 type="email" placeholder="Enter your Email..." required/>
            </label>
            <label>
                 <input 
                 value={password}
                 onChange={(e)=>setPassword(e.target.value)}
                 className="pl-2 focus:outline-none
                 border border-slate-400 bg-inherit placeholder:text-sm placeholder:text-slate-400 text-black rounded block w-full h-9 mb-4
                 "
                 type={passType} placeholder="Create your Password..." required/>
            </label>
            <label>
                 <input 
                 value={rePassword}
                 onChange={(e)=>setRePassword(e.target.value)}
                 className="pl-2 focus:outline-none
                 border border-slate-400 bg-inherit placeholder:text-sm placeholder:text-slate-400 text-black rounded block w-full h-9 mb-2
                 "
                 type={passType} placeholder="Confirm your Password..." required/>
                 {passwordError && <p className="text-sm text-red-700">{passwordError}</p>}
            </label>
            <div className="flex justify-between  mb-4">
                <label className="flex gap-1"><input type='checkbox' checked={isChecked} onChange={handleCheck} className="cursor-pointer"/>
                <span className="text-sm text-black">Show Password</span></label>
            </div>
           
            <button className="flex justify-center bg-red-700 rounded w-full p-2 text-white hover:bg-red-800 mb-2 ...">
            {loading ? <div className="w-5 h-5 border-4 border-t-transparent 
            border-white rounded-full animate-spin" 
            role="status"><span className="sr-only">Loading...</span>
            </div>: 'Signup'}
            </button> 
 
            </form>
            <p className="text-sm mb-4 text-black">Already have an account?<Link className="text-sm text-red-800" to='/login'>login</Link></p>
        </div>
        </div>
    )
}
export default Register;