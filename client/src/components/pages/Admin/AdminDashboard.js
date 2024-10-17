import React from 'react'
import AdminMenu from '../AdminMenu'
import { useAuth } from '../../../context/auth'
const AdminDashboard = () => {
  const [auth] = useAuth();
  return (

    <div className="flex shadow-md rounded mx-auto my-10 border-2 border-black w-[80vw]  dbcontainer">



      <div className='w-[30%] '>
        <AdminMenu />
      </div>


      <div className=' w-[70%] w-full bg-red-500 '>
        <h1> right side  </h1>
      </div>



    </div>


  )
}

export default AdminDashboard