import { useState } from "react";
import { Link, useNavigate, } from "react-router-dom";
import { userLogin } from "../apis";
const Login = () =>{
const [isChecked,setIsChecked]= useState(false)
const [loading,setLoading] = useState(false)
const [passType,setPassType] =useState('password')
const [email,setEmail]=useState('')
const [password,setPassword]=useState('')
const [error,setError]= useState('')
const navigate = useNavigate()
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
    setLoading(true)
    const data =  await userLogin({email,password})
    setLoading(false)
    if(data.code == 0){
        setError('Incorrect password')
    }else if(data.code == 1){
        setError('Please register your account,if you already registered, Please verify Your account.')
    }else{
        window.localStorage.setItem('token',data.token)
        window.localStorage.setItem('isAuthenticate',true)
        navigate('/') 
    }
} 
    return(
        <div className="flex justify-center items-center h-screen font-reem">
            <div className="rounded h-fit w-11/12 max-w-96 flex flex-col justify-center items-center bg-white shadow-lg" >
                <img src="https://ssl.gstatic.com/ui/v1/icons/mail/rfr/logo_gmail_lockup_default_1x_r5.png"></img>
                {error && <p className="font-bold text-red-700 mb-2 text-center">{error}</p>}
                <form className="w-4/5" onSubmit={handleSubmit}>
                    <label>
                        <input 
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                        className=" pl-2 focus:outline-none
                        border border-slate-500 bg-inherit placeholder:text-sm placeholder:text-slate-400 text-black rounded block w-full h-9 mb-4"
                        type="email" placeholder="Enter your Email..." required/>
                    </label>
                    <label>
                        <input 
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                        className="pl-2 focus:outline-none
                        border border-slate-500 bg-inherit placeholder:text-sm placeholder:text-slate-400 text-black rounded block w-full h-9 mb-2"
                        type={passType} placeholder="Enter your Password..." required/>
                    </label>
            <div className="flex justify-between  mb-4">
                <label className="flex gap-1"><input type='checkbox' checked={isChecked} onChange={handleCheck} className="cursor-pointer"/>
                <span className="text-sm text-black">Show Password</span></label>
                <Link className="text-sm text-blue-500" to="/forgot-password">Forgot Password?</Link>
            </div>
            <button className="flex justify-center bg-blue-500 rounded w-full p-2 text-white hover:bg-blue-600 mb-2 ...">
            {loading ? <div className="w-5 h-5 border-4 border-t-transparent 
            border-white rounded-full animate-spin" 
            role="status"><span className="sr-only">Loading...</span>
            </div>: 'Login'}
            </button> 
             </form>
            <p className="text-sm mb-4 text-black">Don't have an account?<Link className="text-sm text-blue-500" to='/register'>Sign Up</Link></p>
        </div>
        </div>
    )
}
export default Login;