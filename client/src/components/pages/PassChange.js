import React from 'react'
import { useNavigate } from 'react-router-dom'

const PassChange = () => {
    const navigate = useNavigate()


    return (
        <>
            <div className='border-2 border-black w-full h-[100svh] gap-10 pt-20 flex items-center flex-col  '>

                <h1 className='text-3xl font-normal '>  Password Changed Successfully </h1>

                <div className=' p-4 flex justify-between w-[30%]'>

                    <button className='py-1 rounded bg-green-500 text-base px-4' onClick={() =>  navigate("/register")}> SignUp </button>
                    <button className='py-1 rounded bg-blue-500 text-base px-4' onClick={() => navigate("/login")}> Login </button>
                   

                </div>
            </div>


        </>
    )
}

export default PassChange