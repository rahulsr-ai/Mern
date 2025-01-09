import React, { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/auth'
import toast from 'react-hot-toast';
import axios from 'axios';
import { useSearch } from '../context/SearchContext';

import Dropdown from 'react-bootstrap/Dropdown';

import { useCart } from '../context/AddToCardContext';

const Header01 = () => {

    const [cart] = useCart()
    const navigate = useNavigate()


    const [auth, setAuth] = useAuth();
    const [search, setsearch] = useSearch();





    const findProduct = async (e) => {
        e.preventDefault()
        try {
            console.log(search);
            const { data } = await axios.get(`/api/v1/auth/product/search-product/${search.keyword}`)
            console.log(data);

            setsearch({
                ...search,
                products: data
            })
            navigate("/search")

        } catch (error) {
            console.log("error while sending request to backend to fetch product");
            console.log(error);

        }

    }



    function logout() {
        console.log("logout clicked");

        setAuth({
            ...auth,
            user: null, token: null

        })



        localStorage.removeItem("auth")
        toast.success("logged out successfuly")
    }


    console.log(cart.length);



    return (
        <nav className='w-full h-[80px] flex justify-between px-10 items-center gap-10 bg-zinc-900 text-white '>

            <div className='logo  p-2 text-2xl text-blue-500  '> EightShop </div>

            <div className='p-2 ml-4 space-x-2'>
                <input type="search" value={search.keyword} onChange={(e) => setsearch({ ...search, keyword: e.target.value })} className='text-black ' />
                <input type="button" value={"Search"} onClick={findProduct} />
            </div>



            <div className='flex items-center  p-2 gap-7 '>

                <Link to="/"> Home </Link>
                <Link to="/category"> Categories </Link>

                {!auth.user && <Link to="/register"> Register </Link>}




                {
                    !auth?.token ? (
                        <button className='ml-9 px-3 py-[2px] rounded-sm bg-green-400'

                        >   <Link to="/login"> Login </Link>
                        </button>
                    ) : (



                        <Dropdown>
                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                <Link> {auth?.user?.role === 1 ? "admin" : "user"} </Link>
                            </Dropdown.Toggle>

                            <Dropdown.Menu>

                                <Dropdown.Item>
                                    <NavLink to={auth?.user?.role === 1 ? "dashboard/admin" : "dashboard/user"}>
                                        DashBoard
                                    </NavLink>
                                </Dropdown.Item>


                                <Dropdown.Item >
                                    <Link onClick={logout} to="/login">
                                        LogOut
                                    </Link>
                                </Dropdown.Item>



                            </Dropdown.Menu>
                        </Dropdown>



                        // <div className="relative group">
                        //     <button
                        //         // onClick={logout}
                        //         className="bg-red-500 text-white px-4 py-[2px] rounded">
                        //         <Link> {auth?.user?.role === 1 ? "admin" : "user"} </Link>
                        //     </button>

                        //     <div className="absolute right-0 mt-1 w-48 bg-white border border-gray-300 rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 group-hover:pointer-events-auto z-10 
                        //     bg-green-500
                        //     ">
                        //         <ul className="text-black">
                        //             <li className="px-4 py-2 hover:bg-gray-200">
                        //                 <NavLink to={auth?.user?.role === 1 ? "dashboard/admin" : "dashboard/user"}>
                        //                     DashBoard
                        //                 </NavLink>
                        //             </li>
                        //             <li className="px-4 py-2 hover:bg-gray-200">
                        //                 <Link onClick={logout} to="/login">
                        //                     LogOut
                        //                 </Link>
                        //             </li>
                        //         </ul>
                        //     </div>
                        // </div>



                    )
                }

                <button className='px-3 py-[2px] rounded-sm bg-yellow-500'>   <Link to="/*"> Cart {cart?.length}  </Link>  </button>



            </div>

        </nav>


    )
}


export default Header01


