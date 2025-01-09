import React from 'react'
// import './AdminMenu.css'
import { Link } from 'react-router-dom'
const AdminMenu = () => {
    return (

        <div className=" flex flex-col px-4 gap-4 py-2">

            <Link to='/dashboard/admin/users' className='px-4 py-2 bg-zinc-200 rounded-sm'>users</Link>
            <Link to='/dashboard/admin/categories' className='px-4 py-2 bg-zinc-200 rounded-sm'>Create categories</Link>
            <Link to='/dashboard/admin/product' className='px-4 py-2 bg-zinc-200 rounded-sm'>create Product</Link>

            <Link to='/dashboard/admin/GetProduct' className='px-4 py-2 bg-zinc-200 rounded-sm'>Product</Link>
            
        </div>

    )
}

export default AdminMenu