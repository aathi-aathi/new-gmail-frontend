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
const userInformations = async(userName)=>{
    const response = await fetch(`${backendURL}/user-info/${userName}`)
    return await response.json()
}
const getAllData = async()=>{
    const response = await fetch(`${backendURL}/all-users`)
    return await response.json()
}
const postFollowData =async(userData)=>{
    const response = await fetch(`${backendURL}/follow`,{
        method:"POST",
        body:JSON.stringify(userData),
        headers:{
        "Content-Type":"application/json; charset=utf-8"
    }
}) 
    return await response.json()
}
const getFollowData = async(fromUser,toUser)=>{
    const response = await fetch(`${backendURL}/follow/${fromUser}`,{
        headers:{  "user_name": toUser}
    })
    return await response.json()  
}
const getFollowRequestData = async(userName)=>{
    const response = await fetch(`${backendURL}/follow-request/${userName}`)
    return await response.json()  
}
const acceptRequestApi =async(userData)=>{
    const response = await fetch(`${backendURL}/accept-request`,{
        method:"PUT",
        body:JSON.stringify(userData),
        headers:{
        "Content-Type":"application/json; charset=utf-8"
    }

}) 
    return await response.json()
}
const rejectRequestApi =async(userData)=>{
    const response = await fetch(`${backendURL}/reject-request`,{
        method:"DELETE",
        body:JSON.stringify(userData),
        headers:{
            "Content-Type":"application/json; charset=utf-8"
        }
}) 
    return await response.json()
}
const sendMessageApi =async(userData)=>{
    const response = await fetch(`${backendURL}/send`,{
        method:"POST",
        body:JSON.stringify(userData),
        headers:{
        "Content-Type":"application/json; charset=utf-8"
    }
}) 
    return await response.json()
}
const getMessagesApi = async(fromUser,toUser)=>{
    const response = await fetch(`${backendURL}/send/${fromUser}`,{
        headers:{  "user_name": toUser}
    })
    return await response.json()  
}
const getChatApi = async(userName)=>{
    const response = await fetch(`${backendURL}/get-chat/${userName}`)
    return await response.json()  
}

export {postData,userLogin,forgotPassword,checkOtp,resetpassword,
    userInformations,getAllData,postFollowData,getFollowData,getFollowRequestData,
     acceptRequestApi,rejectRequestApi
    ,sendMessageApi,getMessagesApi,getChatApi}