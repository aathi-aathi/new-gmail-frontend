const backendURL = import.meta.env.VITE_BACKEND_URL

const postData =async(userData)=>{
    const response = await fetch(`${backendURL}/register`,{
        method:"POST",
        body:JSON.stringify(userData),
        headers:{
        "Content-Type":"application/json; charset=utf-8"
    }
}) 
    return await response.json()
}
const userLogin =async(userData)=>{
    const response = await fetch(`${backendURL}/login`,{
        method:"POST",
        body:JSON.stringify(userData),
        headers:{
        "Content-Type":"application/json; charset=utf-8"
    }

    }) 
    return await response.json()
}
const forgotPassword = async(userData)=>{
    const response = await fetch(`${backendURL}/forgot-password`,{
        method:"POST",
        body:JSON.stringify(userData),
        headers:{
        "Content-Type":"application/json; charset=utf-8"
    }
    })
    return await response.json()
}
const checkOtp =async(userData)=>{
    const response = await fetch(`${backendURL}/check-otp`,{
        method:"POST",
        body:JSON.stringify(userData),
        headers:{
        "Content-Type":"application/json; charset=utf-8"
    }

    }) 
    return await response.json()
}
const resetpassword =async(userData)=>{
    console.log(userData)
    const response = await fetch(`${backendURL}/reset-password`,{
        method:"POST",
        body:JSON.stringify(userData),
        headers:{
        "Content-Type":"application/json; charset=utf-8"
    }

    }) 
    return await response.json()
}
const userInformations = async(email)=>{
    const response = await fetch(`${backendURL}/user-info/${email}`)
    return await response.json()
}
const setProfile = async(userData)=>{
    const response = await fetch(`${backendURL}/set-profile`,{
        method:"POST",
        body:JSON.stringify(userData),
        headers:{
        "Content-Type":"application/json; charset=utf-8"
    }
    })
    return await response.json()
}
export {postData,userLogin,forgotPassword,checkOtp,resetpassword,userInformations,setProfile}