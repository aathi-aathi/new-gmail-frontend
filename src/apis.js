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
const getAllData = async()=>{
    const response = await fetch(`${backendURL}/all-users`)
    return await response.json()
}
const sendMessageApi =async(userData)=>{
    const response = await fetch(`${backendURL}/mail-send`,{
        method:"POST",
        body:JSON.stringify(userData),
        headers:{
        "Content-Type":"application/json; charset=utf-8"
    }
}) 
    return await response.json()
}
const sendDraftApi =async(userData)=>{
    const response = await fetch(`${backendURL}/draft`,{
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
const editInfoApi =async(userData)=>{
    const response = await fetch(`${backendURL}/edit-info`,{
        method:"PUT",
        body:JSON.stringify(userData),
        headers:{
        "Content-Type":"application/json; charset=utf-8"
    }
}) 
    return await response.json()
}
const getInboxMails = async(email)=>{
    const response = await fetch(`${backendURL}/inbox/${email}`)
    return await response.json()
}
const getSentMails = async(email)=>{
    const response = await fetch(`${backendURL}/sent/${email}`)
    return await response.json()
}
const getDraftMails = async(email)=>{
    const response = await fetch(`${backendURL}/draft/${email}`)
    return await response.json()
}
const trashMails =async(userData)=>{
    const response = await fetch(`${backendURL}/trash`,{
        method:"PUT",
        body:JSON.stringify(userData),
        headers:{
        "Content-Type":"application/json; charset=utf-8"
    }
}) 
    return await response.json()
}
const moveMails =async(userData)=>{
    const response = await fetch(`${backendURL}/move-mail`,{
        method:"PUT",
        body:JSON.stringify(userData),
        headers:{
        "Content-Type":"application/json; charset=utf-8"
    }
}) 
    return await response.json()
}
const setStarApi =async(userData)=>{
    const response = await fetch(`${backendURL}/set-star`,{
        method:"PUT",
        body:JSON.stringify(userData),
        headers:{
        "Content-Type":"application/json; charset=utf-8"
    }
}) 
    return await response.json()
}
const unStarApi =async(userData)=>{
    const response = await fetch(`${backendURL}/unstar`,{
        method:"PUT",
        body:JSON.stringify(userData),
        headers:{
        "Content-Type":"application/json; charset=utf-8"
    }
}) 
    return await response.json()
}
export {
    postData,userLogin,forgotPassword,checkOtp,resetpassword,
    userInformations,getAllData
    ,sendMessageApi,getMessagesApi,editInfoApi,getInboxMails,getSentMails,
    moveMails,setStarApi,unStarApi, trashMails, getDraftMails,sendDraftApi
}