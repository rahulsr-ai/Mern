import React from 'react'
import UserMenu from './UserMenu'

const Order = () => {
  return (
    <div className="flex shadow-md rounded mx-auto my-10 border-2 w-[80vw] border-green-500 dbcontainer">



                <div className='w-[30%]'>
                    <UserMenu />
                </div>


                <div className=' w-[70%] w-full bg-red-500 '>
                    <h1> order side  </h1>
                </div>



            </div>
  )
}

export default Order