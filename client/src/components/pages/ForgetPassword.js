

import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';

import toast from 'react-hot-toast';
import { useAuth } from '../../context/auth';


const ForgetPassword = () => {

    const Navigate = useNavigate()
    const [answar, setAnswar] = useAuth()
    const [email, setEmail] = useState("")
    const [newPassword, setnewPassword] = useState("")



    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("/api/v1/auth//forgetPassword", { email, newPassword, answar });

            toast.success("form submitted successfully through react toaster ")

            console.log('navigating user');
            Navigate("/PassChange")



        } catch (error) {
            toast.error("trouble in submitting the form")
            console.log(error);

        }


    }

    return (


        <div className='min-h-screen flex flex-col bg-zinc-900 text-white items-center p-4 '>


            <form onSubmit={handleSubmit} className='w-full min-h-[70vh] flex flex-col items-center gap-3 p-4 border text-black'>


                <h1 className='text-4xl font-normal my-10 text-blue-500'> ForGetPassword </h1>


                <input className='py-1 min-w-[23%] px-4 rounded-sm outline-none mt-6 ' type="email" placeholder='Email' value={email}
                    onChange={(e) => {
                        setEmail(e.target.value)
                    }}
                />
                <input className='py-1 min-w-[23%] px-4 rounded-sm outline-none mt-6 ' type="text" placeholder='enter your answer'
                    onChange={(e) => {
                        setAnswar(e.target.value)
                    }}
                />

                <input className='py-1 min-w-[23%] px-4 rounded-sm outline-none mt-4 ' type="password" placeholder='New Password' value={newPassword}
                    onChange={(e) => {
                        setnewPassword(e.target.value)
                    }}

                />

                <input className='py-1 min-w-[10%] bg-green-500 px-4 rounded-sm mt-10 ' type="submit" value="ChangePassword" />


            </form>


        </div>
    )
}

export default ForgetPassword 