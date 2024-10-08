import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useAuth } from '../context/auth'
import toast from 'react-hot-toast';
const Header01 = () => {
    const [auth, setAuth, isLogin, setisLogin] = useAuth();


    function logout() {
        setAuth({
            ...auth,
            user: null, token: null

        })



        localStorage.removeItem("auth")
        toast.success("logged out successfuly")
    }
    return (
        <nav className='w-full h-[80px] flex justify-between px-10 items-center gap-10 bg-zinc-900 text-white '>

            <div className='logo  p-2 text-2xl text-blue-500  '> EightShop </div>

            <div className='flex items-center  p-2 gap-7 '>

                <Link to="/"> Home </Link>
                <Link to="/*"> Categories </Link>
                <Link to="/register"> Register </Link>



                {
                    !auth?.token ? (
                        <button className='ml-9 px-3 py-[2px] rounded-sm bg-green-400'

                        >   <Link to="/login"> Login </Link>
                        </button>
                    ) : (




                        <div className="relative group ">

                            <button
                                // onClick={logout}
                                className="bg-red-500 text-white px-4 py-[2px] rounded">
                                <Link > {auth?.user?.role === 1 ? "admin" : "user"} </Link>  </button>

                            <div className="absolute right-[0] mt-1 w-48 bg-white border border-gray-300 rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none group-hover:pointer-events-auto">

                                <ul className="text-black">

                                    <li className="px-4 py-2 hover:bg-gray-200">
                                        <NavLink to={auth?.user?.role === 1 ? "dashboard/admin" : "dashboard/user"}> DashBoard </NavLink>

                                    </li>

                                    <li  className="px-4 py-2 hover:bg-gray-200">
                                        <Link onClick={logout} to="/login"> LogOut </Link>

                                    </li>

                                </ul>

                            </div>

                        </div>



                    )
                }

                <button className='px-3 py-[2px] rounded-sm bg-yellow-500'>   <Link to="/*"> Cart </Link>  </button>

            </div>

        </nav>


    )
}

export default Header01


