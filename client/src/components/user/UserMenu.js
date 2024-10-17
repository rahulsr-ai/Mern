import React from 'react'
import { Link } from 'react-router-dom'

const UserMenu = () => {

    const links = [
        { path: "/dashboard/user/profile", text: "Profile", color: "" },
        { path: "/dashboard/user/order", text: "Order", color: "" },
    ]


    return (


        <div className=" flex flex-col px-4 gap-4 py-2">


            {links.map((item, i) => {
                return (

                    <Link to={item.path} className='px-4 py-2 bg-zinc-200 rounded-sm'> {item.text} </Link>


                )
            })}




        </div>


    )
}

export default UserMenu