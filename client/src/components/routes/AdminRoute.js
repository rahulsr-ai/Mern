import { useState,useEffect } from "react";
import { useAuth } from "../../context/auth";
import axios from "axios";
import { Outlet } from "react-router-dom";
import ReDirecting from "../ReDirecting";



const AdminRoute = () => {
const[ok,setOk]=useState(false);
const[auth,setAuth]=useAuth();

useEffect(()=>{
    const authcheck=async()=>{
     const res=await axios.get("/api/v1/auth/admin-auth");
     if(res.data.ok){
        setOk(true)
     }
     else
     {
        setOk(false)
     }
    }

    if(auth?.token) authcheck()

},[auth?.token]);

return ok ? <Outlet/>: <ReDirecting path="login"/>;
}


export default AdminRoute