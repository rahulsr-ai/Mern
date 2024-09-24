import React from 'react'
import { Link, NavLink } from 'react-router-dom'

const Header01 = () => {
    return (
            <nav className='w-full h-[80px] flex justify-between px-10 items-center gap-10 bg-zinc-900 text-white '>    

                <div className='logo  p-2 text-2xl text-blue-500  '> EightShop </div>

                <div className='flex items-center  p-2 gap-7 '>

                    <Link to="/"> Home </Link>
                    <Link to="/*"> Categories </Link>
                    <Link to="/register"> Register </Link>

                    <button className='ml-9 px-3 py-[2px] rounded-sm bg-green-400'>   <Link to="/login"> Login </Link> </button>
                    <button className='px-3 py-[2px] rounded-sm bg-yellow-500'>   <Link to="/*"> Cart </Link>  </button>

                </div>

            </nav>

        
    )
}

export default Header01