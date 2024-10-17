import React from 'react'
import AdminMenu from '../AdminMenu'

const Users = () => {
    return (
        <div className="flex shadow-md rounded mx-auto my-10 border-2 w-[80vw] border-green-500 dbcontainer">



      <div className='w-[30%]'>
        <AdminMenu />
      </div>


      <div className=' w-[70%] w-full bg-red-500 '>
        <h1> right side  </h1>
      </div>



    </div>

    )
}

export default Users