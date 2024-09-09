import { jwtDecode } from "jwt-decode";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { checkOtp } from "../apis";


const ResetVerification = () =>{
const navigate = useNavigate()
const [loading,setLoading] = useState(false)
const pathparam = useParams()
const [otpError,setOtpError] = useState('')
const [formData,setFormData]= useState({
    'first':'',
    'sec':'',
    'third':'',
    'fourth':''
}) 
const token = pathparam.token
const decoded = jwtDecode(token)
const email = decoded.email
const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
        ...formData,
        [name]: value
    });
};
const handleSubmit = async(e)=>{
    e.preventDefault()
    const otp = formData.first+formData.sec+formData.third+formData.fourth
    setLoading(true)
   const data =  await checkOtp({otp,email})
   setLoading(false)
   if(data.code == 1){
    navigate(`/reset-password/${token}`)
   }else{
        setOtpError('Incorrect OTP')
   }
    
}
    return(
        <div className="flex justify-center items-center h-screen bg-slate-100 bg-gradient-to-r from-sky-500 to-indigo-500">
      <div className="rounded h-fit w-11/12 max-w-96 flex flex-col justify-center items-center bg-white shadow-lg" >
            <h2 className="text-xl text-center font-black text-blue-700 mt-4 mb-2">OTP Verification</h2>
            {otpError && <p className="font-bold text-red-700 mb-2">{otpError}</p>}
            <p className="text-sm text-slate-500 w-4/5 text-center">Enter the OTP you received at
            <strong> {email}</strong></p>
            <form className="w-4/5" onSubmit={handleSubmit}>
            <div className="flex justify-center gap-2 mb-2">
                <label>
                 <input 
                 value={formData.first}
                 onChange={handleChange}
                 className=" focus:outline-none
                 border rounded w-12 h-12  mt-2 text-xl text-center"
                 type="text" 
                 maxLength='1'
                 name="first" required/>
            </label>
            <label>
                 <input 
                 value={formData.sec}
                 onChange={handleChange}
                 className=" focus:outline-none
                 border rounded w-12 h-12 mt-2 text-xl text-center"
                 type="text" 
                 maxLength='1'
                 name="sec" required/>
            </label>
            <label>
                 <input 
                 value={formData.third}
                 onChange={handleChange}
                 className=" focus:outline-none
                 border rounded w-12 h-12 text-xl mt-2 text-center"
                 type="text" 
                 maxLength='1'
                 name="third"
                  required/>
            </label>
            <label>
                 <input 
                 value={formData.fourth}
                 onChange={handleChange}
                 className=" focus:outline-none
                 border rounded w-12 h-12  mt-2 text-xl text-center"
                 type="text"
                 maxLength='1'
                 name="fourth"  required/>
            </label>
            </div>
            <button className="flex justify-center bg-blue-700 rounded w-full p-2 text-white hover:bg-blue-600 mb-4 ...">
            {loading ? <div className="w-5 h-5 border-4 border-t-transparent 
            border-blue-500 rounded-full animate-spin" 
            role="status"><span className="sr-only">Loading...</span>
            </div>: 'Verify OTP'}
            </button> 
            </form>
        </div>
        </div>
    )
}
export default ResetVerification;