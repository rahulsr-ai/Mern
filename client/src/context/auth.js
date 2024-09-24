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


import React, { useState, useContext, createContext } from "react";

// Create the Auth Context
const AuthContext = createContext();

// Auth Provider component
const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        user: null,
        token: null, // Initialize token to null or provide a default value
    });
    const [data, setData] = useState([

    ]

    )

    return (
        <AuthContext.Provider value={[auth, setAuth, data, setData]}>
            {children} {/* Use children prop here */}
        </AuthContext.Provider>
    );
};

// Custom hook to use auth context
const useAuth = () => {
    return useContext(AuthContext);
};

export { AuthProvider, useAuth };
