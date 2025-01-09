// import { useState,useContext,createContext } from "react";


// const AuthContext=createContext()




// const AuthProvider=({Children})=>{
//     const[auth,setAuth]=useState({
//         user:null,
//         token:null,
//     })

// return(
//     <AuthContext.Provider value={[auth,setAuth]}>
//         {Children}
//     </AuthContext.Provider>
// )
// }

// const useAuth = () => {
//     return useContext(AuthContext);
// };


// export {AuthProvider,useAuth}


import axios from "axios";
import React, { useState, useEffect, useContext, createContext } from "react";
// import { json } from "react-router-dom";

// Create the Auth Context
const AuthContext = createContext();

// Auth Provider component
const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        user: null,
        token: null, // Initialize token to null or provide a default value

    });
  

    axios.defaults.headers.common['Authorization'] = auth?.token

    useEffect(() => {
        let data = localStorage.getItem("auth");
        if (data) {
            let dataparse = JSON.parse(data)
            setAuth({
                ...auth,
                user: dataparse.user,
                token: dataparse.token
            })
        }
        // eslint-disable-next-line
    }, [])




  

    return (
        <AuthContext.Provider value={[auth, setAuth]}>
            {children} {/* Use children prop here */}
        </AuthContext.Provider>
    );





};

// Custom hook to use auth context
const useAuth = () => {
    return useContext(AuthContext);
};

export { AuthProvider, useAuth };
