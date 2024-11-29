import { jwtDecode } from "jwt-decode";
import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { checkOtp, forgotPassword } from "../apis";

const OTPVerification = () => {
    const navigate = useNavigate()
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [error, setError] = useState("");
  const [timer, setTimer] = useState(30); // Resend timer (seconds)
  const inputsRef = useRef([]);
  const pathparam = useParams()
  const token = pathparam.token
const decoded = jwtDecode(token)
const email = decoded.email
  useEffect(() => {
    if (timer > 0) {
      const countdown = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
      return () => clearInterval(countdown); // Cleanup on component unmount
    }
  }, [timer]);

  const handleChange = (value, index) => {
    if (/^[0-9]?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      setError("");

      // Focus the next input
      if (value && index < 3) {
        inputsRef.current[index + 1].focus();
      }
    }
  };

  const handleBackspace = (e, index) => {
    if (e.key === "Backspace" && otp[index] === "" && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const handleVerify = async(e) => {
    e.preventDefault()
    const enteredOtp = otp.join("");
    if (enteredOtp.length !== 4) {
      setError("Please enter all 4 digits of the OTP.");
    } else {
      setError("");
      let otpnum = Number(enteredOtp)
      
      const data =  await checkOtp({otpnum,email})
      if(data.code == 1){
       navigate(`/login`)
      }else{
          setError('Incorrect OTP')
      }   
      // Add verification logic here
    }
  };

  const handleResendOtp = async(e) => {
    e.preventDefault()
    setOtp(["", "", "", ""]); // Clear the inputs
    setTimer(30); // Reset the timer
    setError("");
    await forgotPassword({email})
    // Add your resend OTP API logic here
  };

  return (
    <div className="flex justify-center items-center h-screen font-reem">
    <div className="rounded h-fit w-11/12 max-w-96 flex flex-col justify-center items-center shadow-lg">
    <img src="https://ssl.gstatic.com/ui/v1/icons/mail/rfr/logo_gmail_lockup_default_1x_r5.png"></img>
    <p className="text-sm text-slate-500 w-4/5 text-center">Enter the OTP you received at
    <strong> {email}</strong></p>
      <div className="flex gap-2 mb-4 mt-4">
        {otp.map((digit, index) => (
          <input
            key={index}
            type="text"
            maxLength="1"
            value={digit}
            ref={(el) => (inputsRef.current[index] = el)}
            onChange={(e) => handleChange(e.target.value, index)}
            onKeyDown={(e) => handleBackspace(e, index)}
            className="w-12 h-12 text-center text-xl border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        ))}
      </div>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <button
        onClick={handleVerify}
        className="px-6 py-2 mb-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        Verify
      </button>
      <div className="text-center mb-4">
        {timer > 0 ? (
          <p className="text-gray-500">Resend OTP in {timer}s</p>
        ) : (
          <button
            onClick={handleResendOtp}
            className="text-blue-500 hover:underline focus:outline-none"
          >
            Resend OTP
          </button>
        )}
      </div>
    </div>
    </div>
  );
};

export default OTPVerification;