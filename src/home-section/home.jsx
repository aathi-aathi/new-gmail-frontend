import { Outlet } from "react-router-dom";
import Navbar from "./navbar"
import { userInformations } from "../apis";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { getUserData } from "../redux/userSlice";

const Home = ()=>{
    const dispatch = useDispatch()
    const token = localStorage.getItem('token')
    const decoded = jwtDecode(token)
    const email = decoded.email
    const userInfo = async()=>{
      const data= await userInformations(email)
        dispatch(getUserData(data))
    }
    useEffect(()=>{
        userInfo()
    },[])
    return(
        <>
        <Navbar/>
        <Outlet/>
        </>
    )
}
export default Home;